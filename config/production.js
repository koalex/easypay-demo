/** ✰✰✰ Konstantin Aleksandrov ✰✰✰ https://github.com/koalex ✰✰✰ **/
/*
 ================================
 ===    PRODUCTION CONFIG    ====
 ================================
 */

// docker run -d -p 27017:27017 -v /$(pwd)/data:/data/db --name mongodb mongo
'use strict';

const defer = require('config/defer').deferConfig;

module.exports =  {
    mongoose: {
        // uri: defer(cfg => { return `mongodb://USER_NAME:PASSWORD@localhost:27017/${cfg.mongoose.dbName}`; }),
        uri: defer(cfg => { return `mongodb://localhost:27017/${cfg.mongoose.dbName}`; }),
    },
    crypto: {
        hash: {
            iterations: 12000 // may be slow(!): iterations = 12000 take ~60ms to generate strong password
        }
    }
};


