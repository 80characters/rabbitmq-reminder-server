'use strict';

exports.name = 'services.tasks-service';

exports.requires = [
    '@chalk',
    'common.db'
];

exports.factory = function (cli, db) {
    class Service {
        getAll() {
            return db().ref('/').once('value');
        }
    }

    return new Service();
}
