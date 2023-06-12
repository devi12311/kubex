const Boom = require("@hapi/boom");
const yaml = require('js-yaml');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

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
                const { clusterId } = request.params;

                const cluster = await Cluster.findOne({
                    where: {
                        organizationId: organization.id,
                        id: clusterId
                    }
                })

                if (!cluster) {
                    return Boom.notFound('Cluster not found')
                }

                return cluster;
            }
        }

        const context = {
            assign: 'context',
            method: async (request, h) => {
                const { kubeConfig } = request.pre.cluster;
                const yamlKubeConfig = yaml.load(kubeConfig);
                const context = yamlKubeConfig.contexts;
                if (context.length === 0) {
                    return Boom.notFound('No context available');
                }
                return yamlKubeConfig.contexts[0].name;
            }
        }

        server.app.middlewares = {
            organization,
            cluster,
            context
        }
    }
}
