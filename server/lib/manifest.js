const config = require('../config');

const manifestConfiguration = {
    server: {
        host: config.server.host,
        port: config.server.port,
        app: config,

        routes: {
            cors: {
                origin: ['http://localhost:3001'],
                additionalHeaders: ['access-control-allow-origin', 'authorization']
            }
        },
    },

    register: {
        plugins: [
            {
                plugin: require('./db'),
                options: config.server.db
            },
            {
                plugin: require('./apis'),
                options: {
                    github: config.server.github
                }
            }
        ]
    }
}

module.exports = manifestConfiguration