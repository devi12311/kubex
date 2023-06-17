const Joi = require("joi");
const Handlers = require("./handlers");
module.exports = async (server, options) => {

    const { organization, cluster, context } = server.app.middlewares;

    server.route({
        method: 'GET',
        path: '/',
        options: {
            description: 'Get config maps of a namespace',
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
            description: 'Create configmap',
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
                    data: Joi.object().required(),
                    immutable: Joi.boolean().default(false)
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
            description: 'Get a configmap',
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
            description: 'Patch a configmap',
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
                // payload: Joi.object({
                //     patch: Joi.array().items(Joi.object({
                //         op: Joi.string(),
                //         path: Joi.string(),
                //         value: Joi.string()
                //     }))
                // })
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
            description: 'Delete a configmap',
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
