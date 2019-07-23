'use strict';

exports.name = 'middlewares.errors-handle';

exports.requires = ['@underscore'];

exports.factory = function (_) {
	return function (err, req, res, next) {
		if (_.indexOf([401, 403, 404], err.status) >= 0) {
			return res.status(err.status).send({
				success: false,
				message: err.message
			});
		}
	}
};
