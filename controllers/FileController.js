'use strict';

const fs = require('fs');
const path = require('path');
const _omit = require('lodash/omit');
const _isEmpty = require('lodash/isEmpty');
const _isArray = require('lodash/isArray');
const _head = require('lodash/head');
const _get = require('lodash/get');
const _includes = require('lodash/includes');
const { PROTOCOL, STORAGE_DOMAIN_NAME, STORAGE_FOLDER } = require('../config');

const Security = require('../utils/Security');

const allowed = {
    size: 45214400,
    dimension: 1200,
    extensions: [
      "jpg",
      "jpeg",
      "png",
      "mp4"
    ]
};

class FileHandler {
    static async upload(ctx) {

        let file = _get(ctx, 'request.files.file');

        file = _isArray(file) ? _head(file) : file;


        if (_isEmpty(file)) {
             return ctx.badRequest('file_required');
         } else if (!_includes(allowed.extensions, _get(file, 'ext'))) {
             return ctx.unsupportedMediaType('invalid_file_type');
         } else if (_get(file, 'size') > allowed.size) {
             return ctx.badRequest('invalid_file_size');
         }

         const mediaTypes = ['video'];
         let type = _get(file.mime.split('/'), 0);

         if (!_includes(mediaTypes, type)) {
             type = 'file';
         }

         const dir = __dirname.split('/');
         delete dir[dir.length-1];

         fs.writeFileSync(path.normalize(`${dir.join('/')}/sofmmb/${_get(file, 'path')}`), _get(file, 'binary'));
         
         return ctx.created({
             file: _omit(file, 'binary')
         })
    }

    static async generateUrl(ctx) {
        const { folder, object } = ctx.request.body;
        console.log(STORAGE_FOLDER)
        return ctx.created(`${PROTOCOL}://${STORAGE_DOMAIN_NAME}/api/v1/files/putObject/${STORAGE_FOLDER}/${folder}/${object}?access_key=${await Security.generateToken({ expIn: '10m'} )}`);
    }

    static async putObject (ctx) {
        const { storage, folder, object } = ctx.params;
        let file = _get(ctx, 'request.files.file');

        file = _isArray(file) ? _head(file) : file;


        if (_isEmpty(file)) {
             return ctx.badRequest('file_required');
         } else if (!_includes(allowed.extensions, _get(file, 'ext'))) {
             return ctx.unsupportedMediaType('invalid_file_type');
         } else if (_get(file, 'size') > allowed.size) {
             return ctx.badRequest('invalid_file_size');
         }

         const mediaTypes = ['video'];
         let type = _get(file.mime.split('/'), 0);

         if (!_includes(mediaTypes, type)) {
             type = 'file';
         }

         const dir = __dirname.split('/');
         delete dir[dir.length-1];

         const url = `${storage}/${folder}/${object}.${_get(file, 'ext')}`;
    
         fs.writeFileSync(path.normalize(`${dir.join('/')}/${url}`), _get(file, 'binary'));
         
         return ctx.ok({
            url: `${PROTOCOL}://${STORAGE_DOMAIN_NAME}/${url}`
         })
    }
};

module.exports = FileHandler;