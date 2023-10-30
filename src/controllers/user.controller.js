"use strict";

const { Router } = require("express");
const UserService = require("../services/user.service");
const JwtMiddleware = require("../middlewares/Jwt.middleware");

class UserController {
    _path = "/users";
    _router = Router();
    userService = new UserService();
    _jwtMiddleware = new JwtMiddleware();

    get Routes()
    {
        this._router.get(this._path, this._jwtMiddleware.authJwtMiddleware, async (req, res) => {
            return res.json(await this.userService.findAll(req));
        });

        this._router.get(`${this._path}/:id`, this._jwtMiddleware.authJwtMiddleware, async (req, res) => {
            return res.json(await this.userService.findById(req));
        });

        this._router.post(this._path, this._jwtMiddleware.authJwtMiddleware, async (req, res) => {
            return res.json(await this.userService.save(req));
        });

        this._router.put(`${this._path}/:id`, this._jwtMiddleware.authJwtMiddleware, async (req, res) => {
            return res.json(await this.userService.updateById(req));
        });

        this._router.delete(`${this._path}/:id`, this._jwtMiddleware.authJwtMiddleware, async (req, res) => {
            return res.json(await this.userService.deleteById(req));
        });
        return this._router;
    }

}

module.exports = UserController;