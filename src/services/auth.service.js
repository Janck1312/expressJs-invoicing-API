"use strict";

const User = require("../entities/User");
const BcryptPassword = require("../utils/bcrypt-password");
const JwtAuthenticate = require("../utils/jwt-authenticate");

class AuthService {
    userEntitie = User;
    _BcryptPassword = new BcryptPassword();
    _jwtAuthenticate = new JwtAuthenticate();

    async login(request)
    {
        try {
            const { body } = request;
            const { email, password } = body;
            let user = await this.userEntitie.findOne({where:{ email }});
            if(!user?.id) throw new Error("user doesn't exist on our database");
            let passwordMatched = await this._BcryptPassword.comparePassword(password, user.password);
            user = user.dataValues;
            if(passwordMatched) {
                return {
                    success: true,
                    message: "user logued successfully",
                    token: await this._jwtAuthenticate.sign_user(user)
                };
            }

            return {
                success:false,
                message:"user/password doesn't match"
            };

        } catch (error) {
            return error.message;
        }
    }

    async me(request)
    {

    }

    async signup(request)
    {
        try {
            
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = AuthService;