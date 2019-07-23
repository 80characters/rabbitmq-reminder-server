'use strict';

exports.name = 'middlewares.auth0';

exports.requires = [
    '@dotenv',
    '@express-jwt',
    '@jwks-rsa'
];

exports.factory = function (
    env,
    jwt,
    jwks) {
    env.config();

    return jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: process.env.AUTH0_JWKS_URI
        }),
        audience: process.env.AUTH0_AUDIENCE,
        issuer: process.env.AUTH0_ISSUER,
        algorithms: [process.env.AUTH0_ALGORITHMS]
    });
};
