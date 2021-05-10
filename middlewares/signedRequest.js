'use strict';

const Security = require('../utils/Security');
const { authConfig } = require('../config');

module.exports = async (ctx, next)=>{
    const { access_key } = ctx.request.query;

    try{
        await Security.verifyToken(access_key);
    }catch(e){
        return ctx.forbidden('access_denied');
    }
    
    await next();
};

