exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        server.app.resources = {
            user: require('./mappers/user'),
            organization: require('./mappers/organization'),
            cluster: require('./mappers/cluster')
        }
    }
}
