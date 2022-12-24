
exports.plugin = {
    pkg: require('./package.json'),
    register: async (server, options) => {

        await server.register({
            plugin: require('./auth'),
            routes: {
                prefix: '/auth'
            },
            options: options
        });

        await server.register({
            plugin: require('./github'),
            routes: {
                prefix: '/github'
            },
            options: options
        });
    }
}