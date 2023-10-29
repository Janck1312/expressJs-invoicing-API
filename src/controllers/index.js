"use strict";

const { Router } = require("express");

/**
 * @requires App controllers registered here
*/
const CustomerController = require("./customer.controller");
const UserController = require("./user.controller");

const index = Router();

/**
 * @requires Push AppRoutes in this array
*/
const AppRoutes = [
    new CustomerController().Routes,
    new UserController().Routes
];

index.use(AppRoutes);

module.exports = index;