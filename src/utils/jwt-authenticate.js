"use strict";

const jsonwebtoken = require("jsonwebtoken");
const config = require("../config/config");

class JwtAuthenticate {
    _jwt = jsonwebtoken;
    keyObject = null;

    constructor(){}

    /**
     * @param {User} user
     * @returns {Promise<string>}
    */
    async sign_user(user)
    {
        try {
            return await this._jwt.sign(
                { email: user.email }, 
                config.JWT_SECRET, 
                { expiresIn: `${config.JWT_EXPIRES_IN_HOURS}h` }
            );
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = JwtAuthenticate;