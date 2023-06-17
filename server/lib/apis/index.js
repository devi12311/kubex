
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
                prefix: '/organizations/{organizationId}/clusters/{clusterId}/namespaces/{namespace}/deployments'
            },
            options: options
        });

        await server.register({
            plugin: require('./organization/cluster/namespace/stateful-sets'),
            routes: {
                prefix: '/organizations/{organizationId}/clusters/{clusterId}/namespaces/{namespace}/stateful-sets'
            },
            options: options
        });

        await server.register({
            plugin: require('./organization/cluster/namespace/custom'),
            routes: {
                prefix: '/organizations/{organizationId}/clusters/{clusterId}/namespaces/{namespace}/custom'
            },
            options: options
        });

        await server.register({
            plugin: require('./organization/cluster/namespace/service'),
            routes: {
                prefix: '/organizations/{organizationId}/clusters/{clusterId}/namespaces/{namespace}/services'
            },
            options: options
        });

        await server.register({
            plugin: require('./organization/cluster/namespace/ingress'),
            routes: {
                prefix: '/organizations/{organizationId}/clusters/{clusterId}/namespaces/{namespace}/ingresses'
            },
            options: options
        });

        await server.register({
            plugin: require('./organization/cluster/namespace/configmap'),
            routes: {
                prefix: '/organizations/{organizationId}/clusters/{clusterId}/namespaces/{namespace}/configmaps'
            },
            options: options
        });
    }

}
