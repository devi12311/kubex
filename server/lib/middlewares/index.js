const Boom = require("@hapi/boom");
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

        server.app.middlewares = {
            organization,
            cluster
        }
    }
}
