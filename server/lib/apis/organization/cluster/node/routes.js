const Joi = require("joi");
const Handlers = require("./handlers");
module.exports = async (server, options) => {

    const { organization, cluster, context } = server.app.middlewares;

    server.route({
        method: 'GET',
        path: '/',
        options: {
            description: 'Get cluster nodes',
            auth: {
                access: {
                    scope: ['user']
                }
            },
            validate: {
                params: Joi.object({
                    organizationId: Joi.string().uuid().required(),
                    clusterId: Joi.string().uuid().required(),
                }).required()
            },
            pre: [
                organization,
                cluster,
                context
            ]
        },
        handler: Handlers.getAll
    });

    server.route({
        method: 'GET',
        path: '/{name}',
        options: {
            description: 'Get a node',
            auth: {
                access: {
                    scope: ['user']
                }
            },
            validate: {
                params: Joi.object({
                    organizationId: Joi.string().uuid().required(),
                    clusterId: Joi.string().uuid().required(),
                    name: Joi.string().required(),
                }).required()
            },
            pre: [
                organization,
                cluster,
                context
            ]
        },
        handler: Handlers.getOne
    });

    server.route({
        method: 'DELETE',
        path: '/{name}',
        options: {
            description: 'Remove a node',
            auth: {
                access: {
                    scope: ['user']
                }
            },
            validate: {
                params: Joi.object({
                    organizationId: Joi.string().uuid().required(),
                    clusterId: Joi.string().uuid().required(),
                    name: Joi.string().required(),
                }).required()
            },
            pre: [
                organization,
                cluster,
                context
            ]
        },
        handler: Handlers.delete
    });

}
