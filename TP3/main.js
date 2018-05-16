'use strict';
const Firebird = require('node-firebird');
const path = require('path');

const options = {
    host: '127.0.0.1',
    port: 3050,
    database: path.resolve(__dirname, '../database/PHA.FDB'),
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: false,
    role: null,
    pageSize: 4096,
};
Firebird.attach(options, function (err, db) {
    if (err) {
        console.log('error', err);
        return;
    }
    db.query('SELECT count(*) FROM T_CLIENT', function (err, result) {
        // IMPORTANT: close the connection
        console.log('result', result[0].COUNT);
        db.detach();
    });
});