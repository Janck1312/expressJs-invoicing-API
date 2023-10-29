"use strict";

const Customer = require("../entities/Customer");

class CustomerService {
    customerEntitie = Customer;
    
    constructor(){}

    async findAll(request) 
    {
        try {
            let { page, limit, search } = request.query;
            page = page || 0;
            limit = limit || 20;
            let skip = null;
            let sql = "SELECT * FROM customers ";

            if (search && search != "") {
                sql = sql + `WHERE name LIKE '%${search}%' OR lastName LIKE '%${search}%' OR identification LIKE '%${search}%' OR email LIKE '%${search}%' `;
            }

            if (page >= 0 && limit) {
                skip = page * limit;
                sql = sql + `LIMIT ${skip},${limit}`;
            }
            const [results] = await this.customerEntitie.sequelize.query(sql);
            const total_records = await this.customerEntitie.sequelize.query("SELECT COUNT(*) as total_records FROM customers"); 
            return {
                data:results,
                total_records: total_records[0][0]["total_records"],
                skipped: limit*page,
                page,
                limit
            };
        } catch (error) {
            return error.message;
        }
    }

    async findById(request)
    {
        try {
            let { id } = request.params;
            return await this.customerEntitie.findOne({ where: { id } });
        } catch (error) {
            return error.message;
        }
    }

    async save(request) 
    {
        try {
            await this.validatePost(request);
            return await this.customerEntitie.create(request.body);
        } catch (error) {
            return error.message;
        }
    }

    async updateById(request)
    {
        try {
            const { body, params } = request;
            await this.validatePut(request);
            let customer = await this.customerEntitie.findOne({ where: { id: params.id } });
            customer.set({ ...body, updated_at: new Date() });
            return await customer.save();
        } catch (error) {
            return error.message;
        }
    }

    async deleteById(request)
    {
        try {
            const { id } = request.params;
            let customer = await this.customerEntitie.findByPk(id);
            if(!customer?.id) throw new Error("customer not found");
            return await customer.destroy();
        } catch (error) {
            return error.message;
        }
    }

    async validatePost(request)
    {
        let customer = null;
        const { name, lastName, identification, email, born, address } = request.body;
        if (name == "" || !name) throw new Error("name is required");
        if (lastName == '' || !lastName) throw new Error("lastname is required");
        if (identification == "" || !identification) throw new Error("identification is required");
        customer = await this.customerEntitie.findOne({ where:{ identification }});
        if (customer?.id) throw new Error("identification already registered.");
        if (email == "" || !email) throw new Error("email is required");
        customer = await this.customerEntitie.findOne({ where:{ email }});
        if (customer?.id) throw new Error("email already registered");
        if (born == "" || !born) throw new Error("born date is invalid");
        if (address == '' || !address) throw new Error("address is required");
    }

    async validatePut(request)
    {
        let customer = null;
        const { name, lastName, identification, email, born, address } = request.body;
        if (name == "" || !name) throw new Error("name is required");
        if (lastName == '' || !lastName) throw new Error("lastname is required");
        if (identification == "" || !identification) throw new Error("identification is required");
        //customer = await this.customerEntitie.findByIdentification(identification);
        //if (customer?.id) throw new Error("identification already registered.");
        if (email == "" || !email) throw new Error("email is required");
        //customer = await this.customerEntitie.findByEmail(email);
        //if (customer?.id) throw new Error("email already registered");
        if (born == "" || !born /*|| typeof born != Date*/) throw new Error("born date is invalid");
        if (address == '' || !address) throw new Error("address is required");
    }
}

module.exports = CustomerService;