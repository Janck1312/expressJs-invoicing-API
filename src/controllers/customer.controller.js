"use strict";

const { Router } = require("express");
const CustomerService = require("../services/customer.service");
const JwtMiddleware = require("../middlewares/Jwt.middleware");

class CustomerController {
    _router = Router();
    _path = "/customers";
    customerService = new CustomerService();
    _jwtMiddleware = new JwtMiddleware();

    get Routes() 
    {
        this._router.get(this._path, this._jwtMiddleware.authJwtMiddleware, async (req, res) => {
            res.json(await this.customerService.findAll(req));
        });

        this._router.post(this._path, this._jwtMiddleware.authJwtMiddleware, async (req, res) => {
            res.json(await this.customerService.save(req));
        });

        this._router.put(`${this._path}/:id`, this._jwtMiddleware.authJwtMiddleware, async (req, res) => {
            res.json(await this.customerService.updateById(req));
        });

        this._router.get(`${this._path}/:id`, this._jwtMiddleware.authJwtMiddleware, async (req, res) => {
            res.json(await this.customerService.findById(req));
        });

        this._router.delete(`${this._path}/:id`, this._jwtMiddleware.authJwtMiddleware, async (req, res) => {
            res.json(await this.customerService.deleteById(req));
        });

        return this._router;
    }
}

module.exports = CustomerController;