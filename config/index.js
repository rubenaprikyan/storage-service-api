'use strict';

const envConfigs = require('dotenv');

envConfigs.config({ path: `${__dirname}/../.env` });

const serverConfig = {
    host: process.env.HOST,
    port: process.env.PORT,
};

const authConfig = {
    apiAuthKey: process.env.API_AUTH_KEY
};

const PROTOCOL = process.env.PROTOCOL;
const STORAGE_FOLDER = process.env.STORAGE_FOLDER;
const STORAGE_DOMAIN_NAME = process.env.STORAGE_DOMAIN_NAME;

module.exports = {
    serverConfig,
    authConfig,
    STORAGE_DOMAIN_NAME,
    STORAGE_FOLDER,
    PROTOCOL
};