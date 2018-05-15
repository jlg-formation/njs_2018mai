'use strict';

const fs = require('fs');

console.log('start');

setTimeout(()=>{
    const buffer = fs.readFileSync('./package.json');

    console.log(buffer.toString());
}, 2000);


