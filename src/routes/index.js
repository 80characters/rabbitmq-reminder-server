'use strict';

exports.name = 'routes.index';

exports.requires = [
	'@express'
];

exports.factory = function (express) {
	let router = express.Router();

	router.get('/', function (req, res, next) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ msg: 'Direct access denied.' }));
	});

	return router;
};

