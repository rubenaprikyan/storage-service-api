'use strict';

const kaBody = require('koa-body');
const respond = require('koa-respond');
const Koa = require('koa');
const app = new Koa();

const normalizer = require('./middlewares/normalizer');

const { serverConfig } = require('./config');
const { HTTP_STATUS_METHODS } = require('./utils/constants');

/**
 * ############## MIDDLEWARES ##############
 */
app.use(require('@koa/cors')());
app.use(kaBody({
    multipart: true,
    formidable: {
        maxFileSize: 1000000000
    }
}));
app.use(normalizer());
app.use(respond({
    statusMethods: HTTP_STATUS_METHODS
 }));

/**
 * ############## ROUTES ##############
 */
 const v1Routes = require('./routes/v1');

 app.use(v1Routes.routes());
 app.use(v1Routes.allowedMethods());

/**
 * ############## SERVER CONFIGURATION ##############
 */
let port = serverConfig.port;

const server = require('http').createServer(app.callback());

server.listen(port, () => {
    console.info(`Server is running on port : ${port}`);
});
