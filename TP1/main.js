const EventEmitter = require('events');

class DownloadEmitter extends EventEmitter { };

const downloadEmitter = new DownloadEmitter();

downloadEmitter.on('progression', e => {
    console.log('progression', e.percent);
});

const progress = (percent) => {
    downloadEmitter.emit('progression', { percent });
};

function sleep(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

const main = async () => {
    const delay = 3000;

    for (let i = 0; i < 100; i++) {
        await sleep(delay / 100);
        progress(i);
    }

};

main();