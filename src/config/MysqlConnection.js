"use strict";

const config = require("./config");
const Sequelize = require("sequelize");

class MysqlConnection {
    connection = null;

    constructor() {
        this.connection = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
            host: config.DB_HOST,
            dialect: "mysql"
        });
    }

    async connect() 
    {
        return await this.connection.authenticate();
    }

    getConnection() 
    {
        return this.connection;
    }
}

module.exports = MysqlConnection;