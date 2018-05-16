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
        const db = await Firebird.attachAsync(options);
        Promise.promisifyAll(db);
        db.sequentially(
            'SELECT FIRST 10 * FROM T_CLIENT ',
            (row, index) => {
                console.log(row);
            }, (err) => { });
        const result = await db.queryAsync('');
        console.log('result', result[0]);
        await db.detachAsync();
    } catch (e) {
        console.log('err', e);
    }
})();
