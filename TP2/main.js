const crypto = require('crypto');
const util = require('util');

const hash = crypto.createHash('sha256');

const string = 'hello truc';


const _sha256 = (string, callback) => {
    hash.on('readable', () => {
        const data = hash.read();
        if (data) {
            callback(null, data.toString('hex'));
        }
    });

    hash.write(string);
    hash.end();
}

function sha256(string) {
    return new Promise((resolve, reject) => {
        _sha256(string, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

const sha256bis = util.promisify(_sha256);

async function main() {

    const result = await sha256bis(string);
    console.log('sha256=' + result);

}

main();