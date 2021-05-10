'use strict';

const bcrypt = require('bcrypt');
const _trim = require('lodash/trim');
const _set = require('lodash/set');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { authConfig } = require('../config');

class Security {
    
    /**
     * @return {*}
     */
    static async verifyToken (token){
        return await jwt.verify(token, authConfig.apiAuthKey);
    }

    /**
     * @return {*}
     */
    static  decodeToken(token){
        return  jwt.decode(token);
    }

    /**
     * @return {*}
     */
    static generateToken ( { issuer, payload, expIn } ) {
            payload ? payload = { usd: payload } : payload = {};
            _set(payload, 'iat', Math.floor(Date.now()/1000));
    
            let options;
            
            if(issuer) {
                options = {
                    issuer
                };
            };

            if (expIn) _set(options, 'expiresIn', expIn);
    
            return jwt.sign(payload ,  authConfig.apiAuthKey, options);
    }

    /**
     * @return {Promise<*>}
     */
    static generateRandomKey(options = 16) {
        return crypto.randomBytes(options).toString('hex');
    }
}


module.exports = Security;