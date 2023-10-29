"use strict";

const { Model, DataTypes } = require("sequelize");
const MysqlConnection = require("../config/MysqlConnection");
const _mysqlConnecton = new MysqlConnection();

class User extends Model {}

User.init({
    id: { type: DataTypes.BIGINT, primaryKey:true },
    name: { type: DataTypes.STRING },
    email: { type:DataTypes.STRING, unique:true },
    email_verified_at: { type:DataTypes.DATE },
    password: { type:DataTypes.STRING },
    remember_token:{ type:DataTypes.STRING },
    created_at:{ type:DataTypes.DATE },
    updated_at:{ type:DataTypes.DATE }

},{ sequelize: _mysqlConnecton.getConnection(), timestamps:false, tableName: "users" });

module.exports = User;