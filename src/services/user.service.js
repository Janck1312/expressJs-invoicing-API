"use strict";

const User = require("../entities/User");

class UserService {
    userEntite = User;

    constructor(){}

    async findAll(request) 
    {
        try {
            let { page, limit, search } = request.query;
            let skip = 0;
            let sql = 'SELECT * FROM users ';

            page = page || 0;
            limit = limit || 20;

            if(search && search != "") 
            {
                sql = sql + `WHERE name LIKE '%${search}%' OR email LIKE '%${search}%' `;
            }

            if (limit && page >= 0)
            {
                skip = page * limit;
                sql = sql + `LIMIT ${skip},${limit}`;
            }

            const [ results ] = await this.userEntite.sequelize.query(sql);
            const total_records = await this.userEntite.sequelize.query("SELECT COUNT(*) as total_records FROM users");

            return {
                data: results,
                total_records: total_records[0][0]["total_records"],
                skipped: limit * page,
                page,
                limit
            };
            
        } catch (error) {
            return error.message;
        }
    }

    async findById(request) {
        try {
            let { id } = request.params;
            return await this.userEntite.findOne({ where: { id } });
        } catch (error) {
            return error.message;
        }
    }

    async save(request) {
        try {
            await this.validatePost(request);
            return await this.userEntite.create({...request.body, created_at:new Date(), updated_at: new Date()});
        } catch (error) {
            return error.message;
        }
    }

    async updateById(request) {
        try {
            const { body, params } = request;
            await this.validatePut(request);
            let customer = await this.userEntite.findOne({ where: { id: params.id } });
            customer.set({ ...body, updated_at: new Date() });
            return await customer.save();
        } catch (error) {
            return error.message;
        }
    }

    async deleteById(request) {
        try {
            const { id } = request.params;
            let customer = await this.userEntite.findByPk(id);
            if (!customer?.id) throw new Error("user not found");
            return await customer.destroy();
        } catch (error) {
            return error.message;
        }
    }

    async validatePost(request) {
        let customer = null;
        const { name, email } = request.body;
        if (name == "" || !name) throw new Error("name is required");
        if (email == "" || !email) throw new Error("email is required");
        customer = await this.userEntite.findOne({ where: { email } });
        if (customer?.id) throw new Error("email already registered");
    }

    async validatePut(request) {
        let customer = null;
        const { name, email } = request.body;
        if (name == "" || !name) throw new Error("name is required");
        if (email == "" || !email) throw new Error("email is required");
        //customer = await this.userEntite.findOne({ where: { email } });
        //if (customer?.id) throw new Error("email already registered");
    }
}

module.exports = UserService;