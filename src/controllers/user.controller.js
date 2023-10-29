"use strict";

const { Router } = require("express");
const UserService = require("../services/user.service");

class UserController {
    _path = "/users";
    _router = Router();
    userService = new UserService();

    get Routes()
    {
        this._router.get(this._path, async (req, res) => {
            return res.json(await this.userService.findAll(req));
        });

        this._router.get(`${this._path}/:id`, async (req, res) => {
            return res.json(await this.userService.findById(req));
        });

        this._router.post(this._path, async (req, res) => {
            return res.json(await this.userService.save(req));
        });

        this._router.put(`${this._path}/:id`, async (req, res) => {
            return res.json(await this.userService.updateById(req));
        });

        this._router.delete(`${this._path}/:id`, async (req, res) => {
            return res.json(await this.userService.deleteById(req));
        });
        return this._router;
    }

}

module.exports = UserController;