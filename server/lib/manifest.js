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
            },
            validate: {
                failAction: async (request, h, err) => {
                    delete err.output.payload.validation;

                    const hapiValidationErrors = err.details.map(detail => {
                        return {
                            key: detail.context.key,
                            message: detail.message,
                            type: detail.type,
                        };
                    });

                    if (!err.output.payload.errors) {
                        err.output.payload.errors = hapiValidationErrors;
                    } else {
                        Object.assign(err.output.payload.errors, hapiValidationErrors);
                    }
                    throw err;
                },
                options: {
                    abortEarly: false
                }
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
                plugin: require('./helpers'),
            },
            {
                plugin: require('./auth'),
                options: {
                    auth: config.server.auth
                }
            },
            {
                plugin: require('./apis'),
                options: {}
            },
            {
                plugin: require('./middlewares'),
                options: {}
            },
            {
                plugin: require('./resources'),
                options: {}
            }
        ]
    }
}

module.exports = manifestConfiguration
