'use strict';

const { authConfig } = require('../config');

module.exports = async (ctx, next)=>{
      if(ctx.request.headers['apiauthkey'] !== authConfig.apiAuthKey){
        return ctx.unauthorized();
      }
      await next();
};

