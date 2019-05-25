'use strict';

const Router = require('koa-router');

const filesRoutes = require('./files');


const router = new Router({
    prefix: '/v1'
});

router.use(filesRoutes.routes());


module.exports = router;