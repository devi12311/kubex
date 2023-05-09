'use strict';
const Joi = require('joi');
const { attributes: ModelAttributes, options: ModelOptions } = require('./model');
const SchemaValidation = require('./validation');

module.exports = (server, options, sequelize) => {

    const Organization = sequelize.define('organization', ModelAttributes, ModelOptions);

    Organization.schema = function () {
        return SchemaValidation
    }

    Organization.addHook('afterValidate', 'joiValidation', async (organization, options) => {
        const { error, value } = SchemaValidation.complete.validate(organization.dataValues)
        if (error) throw new Error(error);
    });

    return Organization;
}
