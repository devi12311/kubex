const Joi = require("joi");
const Handlers = require("./handlers");
module.exports = async (server, options) => {

    const { organization, cluster, context } = server.app.middlewares;

    server.route({
        method: 'GET',
        path: '/',
        options: {
            description: 'Get stateful-sets of a namespace',
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
            description: 'Create a stateful-set',
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
            description: 'Get a stateful-set',
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
        method: 'PUT',
        path: '/{name}',
        options: {
            description: 'Patch a stateful-set',
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
                }).required(),
                payload: Joi.object({
                    patch: Joi.array()
                })
            },
            pre: [
                organization,
                cluster,
                context
            ]

            //TODO check for solution

        },
        handler: Handlers.patch
    });

    server.route({
        method: 'DELETE',
        path: '/{name}',
        options: {
            description: 'Delete a stateful-set',
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
