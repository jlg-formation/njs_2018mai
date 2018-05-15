'use strict';

const fs = require('fs');

console.log('start');

const dormir = (label, temps) => {
    return new Promise((succesAppel, erreurAppel) => {
        console.log(`${label}: Je m'endors pour ${temps}ms`);
        if (temps > 4000) {
            erreurAppel(`tu as depasse 4000. (${temps})`);
        } else {
            setTimeout(succesAppel, temps);
        }
    });
};


const main = () => {
    dormir('A', 2000).then(() => {
        return Promise.all([
            dormir('B', 1000).then(() => dormir('E', 1000)),
            dormir('C', 2000),
            dormir('D', 3000),
        ]);
    }).then(() => dormir('F', 2000)).catch((err) => {
        console.log('erreur:', err);
    });
};


main();

