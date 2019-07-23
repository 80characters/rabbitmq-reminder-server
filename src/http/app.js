'use strict';

exports.name = 'http.app';

exports.requires = [
	'@express',
	'@path',
	'@cookie-parser',
	'@morgan',
	'@body-parser',
	'routes.index',
	'routes.api'
];

exports.factory = function (
	express,
	path,
	cookieParser,
	logger,
	bodyParser,
	indexRouter,
	apiRouter) {
	var app = express();

	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static('./public'));

	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	app.use('/', indexRouter);
	app.use('/api/', apiRouter);

	return app;
};
