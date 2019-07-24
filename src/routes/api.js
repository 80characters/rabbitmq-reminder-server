'use strict';

exports.name = 'routes.api';

exports.requires = [
    '@express',
    '@chalk',
    '@bluebird',
    '@amqplib',
    'services.tasks-service'
];

exports.factory = function (express, cli, promise, amqp, service) {
    let router = express.Router();

    router.get('/v1/tasks/', function (req, res, next) {
        service.getAll()
            .then(snapshot => {
                res.json(snapshot.val())
            })
            .catch((err) => next(err));
    });


    router.post('/v1/tasks/', function (req, res, next) {
        let task = req.body;

        const assertQueueOptions = { durable: true };
        const sendToQueueOptions = { persistent: true };
        const data = JSON.stringify(task);
        const { uri, workQueue } = {
            uri: process.env.rabbitUri || 'amqp://localhost',
            workQueue: process.env.workQueue || 'rabbitmq-reminder'
        }

        const shipper = () => {
            return promise.resolve(
                console.log('Send data to AMQP server')
            );
        }

        const assertAndSendToQueue = (channel) => {
            const bufferedData = Buffer.from(data);

            return channel.assertQueue(workQueue, assertQueueOptions)
                .then(() => {
                    return channel.sendToQueue(workQueue, bufferedData, sendToQueueOptions);
                })
                .then(() => {
                    return channel.close();
                });
        }

        const sendHardTaskToQueue = () => amqp.connect(uri)
            .then(connection => connection.createChannel())
            .then(channel => assertAndSendToQueue(channel));

        const start = () => shipper().then(() => sendHardTaskToQueue());

        try {
            start();
        } catch (err) {
            console.log(e);
            res.status(401).json({ msg: 'Oops! something went wrong?' });
        }

        res.status(201).json({ msg: 'This task has been send to queue.' });
    });

    return router;
};

