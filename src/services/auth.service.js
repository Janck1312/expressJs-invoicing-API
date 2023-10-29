"use strict";

const User = require("../entities/User");
const BcryptPassword = require("../utils/bcrypt-password");

class AuthService {
    userEntitie = User;
    _BcryptPassword = new BcryptPassword();

    async login(request)
    {
        try {
            const { body } = request;
            const { email, password } = body;
            let user = await this.userEntitie.findOne({where:{ email }});
            if(!user?.id) throw new Error("user doesn't exist on our database");
            let passwordMatched = await this._BcryptPassword.comparePassword(password, user.password);
            
            if(passwordMatched) {
                return {
                    success:true,
                    message: "user logued successfully",
                    token: ""
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

    async signup(request)
    {
        try {
            
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = AuthService;