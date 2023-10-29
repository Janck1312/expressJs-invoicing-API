"use strict";

const bcrypt = require('bcrypt');
const saltRounds = 10;

class BcryptPassword {
    _bcrypt = bcrypt;

    /**
     * @param {string} password 
     * @returns {Promise<string>}
     */
    async encryptPassword(password)
    {
        try {
            return await this._bcrypt.hash(password, saltRounds);
        } catch (error) {
            return error.message;
        }
    }
    
    /**
     * @param {string} plain_password 
     * @param {string} hashed_password 
     * @returns {Promise<boolean>}
     */
    async comparePassword(plain_password, hashed_password) 
    {
        try {
            return await this._bcrypt.compare(plain_password, hashed_password);
        } catch (error) {
            return error.message;
        }
    }

}

module.exports = BcryptPassword;