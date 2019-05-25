'use strict';

const _get = require('lodash/get');
const fileType = require('file-type');
const readChunk = require('read-chunk');
const _extend = require('lodash/extend');
const _isEmpty = require('lodash/isEmpty');
const _isArray = require('lodash/isArray');
const _isObject = require('lodash/isObject');
const _toString = require('lodash/toString');
const randomString = require('randomstring');

const  File = require('../utils/File');

const fileTypes = {
    csv: {
        ext: 'csv',
        mime: 'text/csv'
    }
};

async function normalizeFile(file) {
    const binary = readChunk.sync(_get(file, 'path') , 0, _get(file, 'size'));
    const fileInfo = fileType(binary) || {};

    if (_isEmpty(fileInfo)) {
        const isCsv = await File.validateCsv(_get(file, 'path'));

        if (isCsv) {
            _extend(fileInfo, fileTypes.csv);
        }
    }

    const name = `${randomString.generate(32)}.${_get(fileInfo, 'ext')}`;
    return {
        binary,
        size: _toString(_get(file, 'size')),
        mime: _get(fileInfo, 'mime'),
        ext: _get(fileInfo, 'ext'),
        path: `${_get(fileInfo.mime.split('/'), 0)}s/${name}`,
        name
    };
}

async function normalizer(ctx, next) {
    if (ctx.request.type === 'multipart/form-data') {
        for (let key of Object.keys(ctx.request.files)) {
            const value = _get(ctx.request.files, key);

            if (_isArray(value)) {
                ctx.request.files[key] = [];

                for (let item of value) {
                    ctx.request.files[key].push(await normalizeFile(item));
                }
            } else if (_isObject(value)) {
                ctx.request.files[key] = await normalizeFile(value);
            }
        }
    }

    await next();
}

module.exports = () => normalizer;
