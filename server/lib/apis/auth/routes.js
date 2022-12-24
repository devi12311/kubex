const Handlers = require('./handlers');
const Joi = require('joi');

module.exports = async (server, options) => {

    server.route({
        method: 'GET',
        path: '/github',
        options: {
            description: 'Route that checks if token is valid by callin an api',
            validate: {
                query: Joi.object({
                    token: Joi.string().required()
                })
            },
        },
        handler: Handlers.validateAccessToken
    });
}