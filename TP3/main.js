'use strict';
const Firebird = require('node-firebird');
const path = require('path');
const Promise = require('bluebird');
Promise.promisifyAll(Firebird);

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

(async function () {
    try {
        let counter = 0;
        const db = await Firebird.attachAsync(options);
        Promise.promisifyAll(db);
        await db.sequentiallyAsync(
            'SELECT * FROM T_CLIENT ',
            (row, index) => {
                counter++;
            });
        console.log('counter = ', counter);
        await db.detachAsync();
    } catch (e) {
        console.log('err', e);
    }
})();
