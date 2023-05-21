const Handlers = require('./handlers');
const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = async (server, options) => {

    const organization = {
        assign: 'organization',
        async method (request, h) {
            const { organizationId } = request.params;
            const { Organization } = server.app.models;
            const { user } = request.auth.credentials;
            const { id: userId } = user;

            const organization = await Organization.findOne({
                where: {
                    id: organizationId,
                    userId
                }
            })

            if (!organization) {
                return Boom.notFound('Organization not found')
            }

            return organization
        }
    }

    const cluster = {
        assign: 'cluster',
        async method(request, h) {
            const { Cluster } = server.app.models;
            const { organization } = request.pre;

            const cluster = await Cluster.findOne({
                where: {
                    organizationId: organization.id
                }
            })

            if (!cluster) {
                return Boom.notFound('Cluster not found')
            }

            return cluster;
        }
    }

    server.route({
        method: 'POST',
        path: '/',
        options: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                multipart: true,
            },
            validate: {
                params: Joi.object({
                    organizationId: Joi.string().uuid().required()
                }).required()
            },
            pre: [
                organization
            ]
        },
        handler: Handlers.create
    });

    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: {
                access: {
                    scope: ['user']
                }
            },
            description: 'Get users clusters',
            validate: {
                params: Joi.object({
                    organizationId: Joi.string().uuid().required()
                }).required()
            },
            pre: [
                organization,
                {
                    assign: 'mapper',
                    async method(request, h) {
                        return server.app.resources.cluster.listMapper
                    }
                }
            ]
        },
        handler: Handlers.getAll
    });

    server.route({
        method: 'GET',
        path: '/{id}',
        options: {
            auth: {
                access: {
                    scope: ['user']
                }
            },
            description: 'Get clusters of an organization',
            validate: {
                params: Joi.object({
                    organizationId: Joi.string().uuid().required(),
                    id: Joi.string().uuid().required(),
                }).required()
            },
            pre: [
                organization,
                cluster,
                {
                    assign: 'mapper',
                    async method(request, h) {
                        return server.app.resources.cluster.modelMapper
                    }
                }
            ]
        },
        handler: async (request, h) => {
            return request.pre.mapper(request.pre.cluster)
        }
    });

    server.route({
        method: 'DELETE',
        path: '/{id}',
        options: {
            auth: {
                access: {
                    scope: ['user']
                }
            },
            description: 'Delete cluster',
            validate: {
                params: Joi.object({
                    organizationId: Joi.string().uuid().required(),
                    id: Joi.string().uuid().required(),
                }).required()
            },
            pre: [
                organization,
                cluster
            ]
        },
        handler: async (request, h) => {
            const { cluster } = request.pre;
            await cluster.destroy();
            return { message: 'Cluster deleted' };
        }
    });

}
