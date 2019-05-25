'use strict';

const envConfigs = require('dotenv');

envConfigs.config({ path: `${__dirname}/../.env` });

const serverConfig = {
    host: process.env.HOST,
    port: process.env.PORT,
};

const authConfig = {
    authKey: process.env.API_AUTH_KEY
}

module.exports = {
    serverConfig,
    authConfig
}