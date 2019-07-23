'use strict';

exports.name = 'common.db';

exports.requires = [
    '@firebase-admin',
    '@dotenv'
];

exports.factory = function (admin, env) {
    env.config();

    return () => {
        if (!admin.apps.length) {
            let serviceAccount = require('../../config/serviceAccountKey.json');
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: `https://${process.env.DATABASE}.firebaseio.com`
            });
        }

        return admin.database();
    }
}
