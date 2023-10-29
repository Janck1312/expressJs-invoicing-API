"use strict";

const { DataTypes, Model } = require("sequelize");
const MysqlConnection = require("../config/MysqlConnection");

const _mysqlConnection = new MysqlConnection();

class Customer extends Model {}

Customer.init({
    id: { type: DataTypes.BIGINT, primaryKey: true },
    name: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    identification: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    born: { type: DataTypes.DATE },
    address: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
}, { sequelize: _mysqlConnection.getConnection(), timestamps: false });

module.exports = Customer;