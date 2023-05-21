'use strict';
const Joi = require('joi');
const { attributes: ModelAttributes, options: ModelOptions } = require('./model');
const SchemaValidation = require('./validation');

module.exports = (server, options, sequelize) => {

    const Cluster = sequelize.define('cluster', ModelAttributes, ModelOptions);

    Cluster.schema = function () {
        return SchemaValidation
    }

    Cluster.addHook('afterValidate', 'joiValidation', async (cluster, options) => {
        const { error, value } = SchemaValidation.complete.validate(cluster.dataValues)
        if (error) throw new Error(error);
    });

    return Cluster;
}
