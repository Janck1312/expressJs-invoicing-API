"use strict";

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    DB_HOST: process.env.DB_HOST || "",
    DB_NAME: process.env.DB_NAME || "",
    DB_USER: process.env.DB_USER || "",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    APP_PORT: process.env.APP_PORT || 3000
};