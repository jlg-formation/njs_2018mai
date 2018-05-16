'use strict';
const Firebird = require('node-firebird');
const path = require('path');
const Promise = require('bluebird');
Promise.promisifyAll(Firebird);
const fs = require('fs');

const stream = fs.createWriteStream('client.csv');

const { configure, client } = require('./configure-elastic');

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

        await configure();
        await db.sequentiallyAsync(
            'SELECT FIRST 10 * FROM T_CLIENT ',
            async (row, index) => {
                counter++;
                stream.write(`${row.T_CLIENT_ID};${row.MATRICULE};${row.NOM}` + '\n');
                try {
                    await client.index({
                        index: 'client',
                        id: row.T_CLIENT_ID,
                        type: 'MesClients',
                        body: row,
                        
                    });
                } catch (e) {
                    console.log('error', e);
                }

            });
        console.log('counter = ', counter);
        await db.detachAsync();
    } catch (e) {
        console.log('err', e);
    }
})();
