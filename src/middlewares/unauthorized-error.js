'use strict';

exports.name = 'middlewares.unauthorized-error';

exports.requires = [];

exports.factory = function () {
	return function (err, req, res, next) {
		const TYPE = 'UnauthorizedError';

		if (TYPE === err.name) {
			return res.status(401).send({
				success: false,
				message: 'No token provided.'
			});
		}
	}
};
