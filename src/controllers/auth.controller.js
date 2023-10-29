"use strict";

const { Router } = require("express");
const AuthService = require("../services/auth.service");

class AuthController {

    _router = Router();
    _path = "/public/auth";
    _authService = new AuthService();

    get Routes() {

        this._router.post(`${this._path}/sign-up`, async (req, res) => {
            return res.json();
        });

        this._router.get(`${this._path}/me`, async (req, res) => {
            return res.json();
        });

        this._router.post(this._path, async (req, res) => {
            return res.json(await this._authService.login(req));
        });

        return this._router;
    }

}

module.exports = AuthController;