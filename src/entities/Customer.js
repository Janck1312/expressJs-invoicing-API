"use strict";

const MysqlConnection = require("../config/MysqlConnection");

class Customer {
    connection =  null;
    _mysqlConnection = new MysqlConnection();
    constructor() {}

    async setConnection() {
        this._mysqlConnection.createConnection();
        this.connection = await this._mysqlConnection.getConnection();
    }
    
    async findAll(request) {
        try {
            let { page, limit, search } = request.query;
            page = page || 0;
            limit = limit || 20;
            let skip = null;
            let sql = "SELECT * FROM customers ";
            if(search && search !="") 
            {
                sql = sql + `WHERE 'name' LIKE '%${search}%' OR 'lastName' LIKE '%${search}%' OR 'identification' LIKE '%${search}%' OR 'email' LIKE '%${search}%' `;
            }

            if (page >= 0 && limit)
            { 
                skip = page*limit;
                sql = sql + `LIMIT ${skip},${limit}`;
            }

            await this.setConnection();
            let total_records = await this.connection.query("SELECT COUNT(*) AS total_records FROM customers");
            total_records = total_records[0]["total_records"];
            let data = await this.connection.query(sql); 
            await this.connection.destroy();
            return {
                data,
                limit,
                page,
                skipped: skip,
                total_records 
            };
        } catch (error) {
            return error.message;
        }
    }

    async save(body) {
        try {
            const { name, lastName, identification, email, born, address } = body;
            await this.setConnection();
            let sql = `INSERT INTO customers(name, lastName, identification, email, born, address) VALUES ('${name}', '${lastName}', '${identification}', '${email}', '${born}', '${address}')`;
            let customer = await this.connection.query(sql);
            this.connection.destroy();
            return customer;            

        } catch (error) {
            return error.message;
        }
    } 

    async findByIdentification(identification) 
    {
        try {
            await this.setConnection();
            let customer = await this.connection.query(`SELECT * FROM customers WHERE identification='${identification}'`);
            await this.connection.destroy();
            return customer.at(0);
        } catch (error) {
            return error.message;
        }
    }

    async findByEmail(email)
    {
        try {
            await this.setConnection();
            let customer = await this.connection.query(`SELECT * FROM customers WHERE email='${email}'`);
            await this.connection.destroy();
            return customer.at(0);
        } catch (error) {
            
        }
    }

    async findById(id)
    {
        try {
            await this.setConnection();
            let customer = await this.connection.query(`SELECT * FROM customers where id='${id}'`);
            await this.connection.destroy();
            return customer.at(0);
        } catch (error) {
            return error.message;
        }
    }

    async updateById(body, id)
    {
        try{
            let sql = `UPDATE customers SET name='${body.name}', lastName='${body.lastName}', identification='${body.identification}', email='${body.email}', born='${body.born}', address='${body.address}' WHERE id='${id}'`;
            await this.setConnection();
            customer = await this.findById(id);
            if(!customer?.id) throw new Error("user not found");
            customer = await this.connection.query(sql);
            await this.connection.destroy();
            return customer;
        }catch(error) {
            return error.message;
        }
    }

    async deleteById(id)
    {
        try {
            let sql = `DELETE FROM customers WHERE id='${id}'`;
            let customer = await this.findById(id);
            if(!customer?.id) throw new Error("customer not found");
            await this.setConnection();
            await this.connection.query(sql);
            await this.connection.destroy();
            return "customer deleted success";
        } catch (error) {
            return error.message;
        }
    }

}

module.exports = Customer;