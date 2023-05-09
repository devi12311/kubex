exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        const testMiddleware = async () => {

        }

        server.app.middlewares = {
            testMiddleware
        }
    }
}
