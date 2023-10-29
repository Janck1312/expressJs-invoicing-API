"use strict";

const Customer = require("../entities/Customer");


class CustomerService {
    customerEntitie = new Customer();
    
    constructor(){}

    async findAll(request) 
    {
        try {
            return await this.customerEntitie.findAll(request);
        } catch (error) {
            return error.message;
        }
    }

    async findById(request)
    {
        try {
            let { id } = request.params;
            return await this.customerEntitie.findById(id);
        } catch (error) {
            return error.message;
        }
    }

    async save(request) 
    {
        try {
            await this.validatePost(validatePostAndPut);
            return await this.customerEntitie.save(request.body);
        } catch (error) {
            return error.message;
        }
    }

    async updateById(request)
    {
        try {
            const { body, params } = request;
            await this.validatePut(request);
            return await this.customerEntitie.updateById(body, params.id);
        } catch (error) {
            return error.message;
        }
    }

    async deleteById(request)
    {
        try {
            const { id } = request.params;
            return await this.customerEntitie.deleteById(id);
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
        customer = await this.customerEntitie.findByIdentification(identification);
        if (customer?.id) throw new Error("identification already registered.");
        if (email == "" || !email) throw new Error("email is required");
        customer = await this.customerEntitie.findByEmail(email);
        if (customer?.id) throw new Error("email already registered");
        if (born == "" || !born /*|| typeof born != Date*/) throw new Error("born date is invalid");
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