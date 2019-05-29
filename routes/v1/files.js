'use strict';

const Router = require('koa-router');
const FileController = require('../../controllers/FileController');

const authorize = require('../../middlewares/authorize');
const signedRequest = require('../../middlewares/signedRequest');

const router = new Router({
    prefix: '/files'
});

router.post('/upload', FileController.upload);
router.post('/generateSignedUrl', authorize, FileController.generateUrl);
router.post('/putObject/:storage/:folder/:object', signedRequest, FileController.putObject);

module.exports = router;