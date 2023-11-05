"use strict";

const { Router } = require("express");
const AuthService = require("../services/auth.service");
const JwtMiddleware = require("../middlewares/Jwt.middleware");

class AuthController {

    _router = Router();
    _publicPath = "/public/auth";
    _path = "/auth";
    _authService = new AuthService();
    _jwtMiddleware = new JwtMiddleware();

    get Routes() {

        this._router.post(`${this._path}/sign-up`, async (req, res) => {
            return res.json();
        });

        this._router.get(`${this._path}/me`, this._jwtMiddleware.authJwtMiddleware, async (req, res) => {
            return res.json(await this._authService.me(req));
        });

        this._router.post(this._publicPath, async (req, res) => {
            return res.json(await this._authService.login(req));
        });

        return this._router;
    }

}

module.exports = AuthController;