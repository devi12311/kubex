const Joi = require("joi");
const Handlers = require("./handlers");
module.exports = async (server, options) => {

    const { organization, cluster, context } = server.app.middlewares;

    server.route({
        method: 'GET',
        path: '/',
        options: {
            description: 'Get pvcs of a namespace',
            auth: {
                access: {
                    scope: ['user']
                }
            },
            validate: {
                params: Joi.object({
                    organizationId: Joi.string().uuid().required(),
                    clusterId: Joi.string().uuid().required(),
                    namespace: Joi.string().required(),
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
            description: 'Create pvc',
            auth: {
                access: {
                    scope: ['user']
                }
            },
            validate: {
                params: Joi.object({
                    organizationId: Joi.string().uuid().required(),
                    clusterId: Joi.string().uuid().required(),
                    namespace: Joi.string().required(),
                }).required(),
                payload: Joi.object({
                    metadata: Joi.object().required(),
                    spec: Joi.object().required(),
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
        method: 'GET',
        path: '/{name}',
        options: {
            description: 'Get a pvc',
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
                    namespace: Joi.string().required()
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
            description: 'Delete a pvc',
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
                    namespace: Joi.string().required()
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
