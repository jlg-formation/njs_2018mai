'use strict';

const fs = require('fs');

console.log('start');

const dormir = (temps) => {
    return new Promise((succesAppel, erreurAppel) => {
        if (temps > 4000) {
            erreurAppel(`tu as depasse 4000. (${temps})`);
        } else {
            setTimeout(succesAppel, temps);
        }
    });
};


const main = () => {
    dormir(8000).then(() => {}).catch((err) => {
        console.log('erreur', err);
    });
};


main();

