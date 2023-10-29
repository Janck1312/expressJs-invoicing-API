"use strict";

const { Router } = require("express");

/**
 * @requires App controllers registered here
*/
const CustomerController = require("./customer.controller");

const index = Router();

/**
 * @requires Push AppRoutes in this array
*/
const AppRoutes = [
    new CustomerController().Routes,

];

index.use(AppRoutes);

module.exports = index;