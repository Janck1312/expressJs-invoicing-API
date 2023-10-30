"use strict";

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    DB_HOST: process.env.DB_HOST || "",
    DB_NAME: process.env.DB_NAME || "",
    DB_USER: process.env.DB_USER || "",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN_HOURS: process.env.JWT_EXPIRES_IN_HOURS,
    APP_PORT: process.env.APP_PORT || 3000
};