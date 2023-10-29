"use strict";

const mysql = require("promise-mysql");
const config = require("./config");

class MysqlConnection {

    constructor() { }

    _mysql = mysql;
    connection = null;

    createConnection() {
        this.connection = this._mysql.createConnection({
            host: config.DB_HOST,
            database: config.DB_NAME,
            user: config.DB_USER,
            password: config.DB_PASSWORD
        });
    }

    async destroyConnection() {
        await this.connection.destroy();
    }

    getConnection() {
        return this.connection;
    }

}

module.exports = MysqlConnection;