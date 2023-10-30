"use strict";

const jsonwebtoken = require("jsonwebtoken");
const config = require("../config/config");

class JwtMiddleware {
    _jwt = jsonwebtoken;

    constructor(){}

    async authJwtMiddleware(req, res, next)
    {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.split(' ')[1];
                const user = await jsonwebtoken.verify(token, config.JWT_SECRET, {});
                if (!user) {
                    res.status(401).json("Unauthorized");
                } else {
                    req.params.userInSession = user;
                    next();
                }
            } else {
                return res.status(401).send("unauthorized");
            }
        } catch (error) {
            return res.status(401).json("unauthorized " + error.message);            
        }
    }
}

module.exports = JwtMiddleware;