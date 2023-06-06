const Joi = require("joi");
const Handlers = require("./handlers");
module.exports = async (server, options) => {

    const { organization, cluster, context } = server.app.middlewares;

    server.route({
        method: 'GET',
        path: '/',
        options: {
            description: 'Get cluster namespaces',
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
        method: 'POST',
        path: '/',
        options: {
            description: 'Create namespace',
            auth: {
                access: {
                    scope: ['user']
                }
            },
            validate: {
                params: Joi.object({
                    organizationId: Joi.string().uuid().required(),
                    clusterId: Joi.string().uuid().required(),
                }).required(),
                payload: Joi.object({
                    name: Joi.string().required()
                })
            },
            pre: [
                organization,
                cluster,
                context
            ]
        },
        handler: Handlers.create
    });

    server.route({
        method: 'DELETE',
        path: '/{name}',
        options: {
            description: 'Delete a namespace',
            auth: {
                access: {
                    scope: ['user']
                }
            },
            validate: {
                params: Joi.object({
                    organizationId: Joi.string().uuid().required(),
                    clusterId: Joi.string().uuid().required(),
                    name: Joi.string().required()
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
