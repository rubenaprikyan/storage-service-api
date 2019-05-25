'use strict';

const Router = require('koa-router');
const FileController = require('../../controllers/FileController');

const router = new Router({
    prefix: '/files'
});

router.post('/upload', FileController.upload);

module.exports = router;