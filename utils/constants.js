'use strict';

const HTTP_STATUS_METHODS = {
    ok: 200,
    created: 201,
    accepted: 202,
    noContent: 204,
    forbidden: 403,
    notFound: 404,
    internalServerError: 500,
    unsupportedMediaType: 415
};

module.exports = {
    HTTP_STATUS_METHODS
};