
exports.plugin = {
    pkg: require('./package.json'),
    register: async (server, options) => {

        await server.register({
            plugin: require('./organization'),
            routes: {
                prefix: '/organizations'
            },
            options: options
        });

        await server.register({
            plugin: require('./organization/cluster'),
            routes: {
                prefix: '/organizations/{organizationId}/clusters'
            },
            options: options
        });

        await server.register({
            plugin: require('./organization/cluster/namespace'),
            routes: {
                prefix: '/organizations/{organizationId}/clusters/{clusterId}/namespaces'
            },
            options: options
        });

        await server.register({
            plugin: require('./organization/cluster/namespace/pod'),
            routes: {
                prefix: '/organizations/{organizationId}/clusters/{clusterId}/namespaces/{namespace}/pods'
            },
            options: options
        });

        await server.register({
            plugin: require('./organization/cluster/namespace/deployment'),
            routes: {
                prefix: '/organizations/{organizationId}/clusters/{clusterId}/namespaces/{namespace}/delpoyments'
            },
            options: options
        });
    }
}
