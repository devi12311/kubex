const Handlers = require('./handlers');
const Joi = require('joi');

module.exports = async (server, options) => {

    const { Auth: AuthHelpers } = server.app.helpers;

    server.route({
        method: 'POST',
        path: '/register',
        options: {
            auth: false,
            description: 'Register route',
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                    email: Joi.string().required(),
                })
            },
        },
        handler: Handlers.register
    });

    server.route({
        method: 'POST',
        path: '/login',
        options: {
            auth: false,
            description: 'Register route',
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                })
            },
            pre: [
                {
                    assign: 'auth',
                    async method(request, h) {
                        return new AuthHelpers(options.auth)
                    }
                },
            ],
        },
        handler: Handlers.login
    });
}
