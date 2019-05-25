'use strict';

const { authConfig } = require('../../config/index');

module.exports = async (ctx, next)=>{
      if(ctx.request.headers['apiauthkey'] !== authConfig.apiAuthKey){
        return ctx.forbidden('access_denied');
      }
      await next();
};

