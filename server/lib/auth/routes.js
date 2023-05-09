const Handlers = require('./handlers');
const Joi = require('joi');

module.exports = async (server, options) => {

    const { Auth: AuthHelpers } = server.app.helpers;

    server.route({
        method: 'POST',
        path: '/auth/register',
        options: {
            auth: false,
            description: 'Register route',
            validate: {
                payload: Joi.object({
                    username: Joi.string().trim().required(),
                    password: Joi.string().trim().required(),
                    email: Joi.string().trim().required(),
                })
            },
        },
        handler: Handlers.register
    });

    server.route({
        method: 'POST',
        path: '/auth/login',
        options: {
            auth: false,
            description: 'Register route',
            validate: {
                payload: Joi.object({
                    username: Joi.string().trim().required(),
                    password: Joi.string().trim().required(),
                })
            },
            pre: [
                {
                    assign: 'auth',
                    async method(request, h) {
                        return new AuthHelpers(options.auth)
                    }
                },
                {
                    assign: 'mapper',
                    async method (request, h) {
                        return server.app.resources.user.modelMapper
                    }
                }
            ],
        },
        handler: Handlers.login
    });

    server.route({
        method: 'POST',
        path: '/auth/logout',
        options: {
            auth: 'kubex',
            description: 'User logs out',
            tags: ['api', 'auth', 'logout'],
            validate: {
                payload: Joi.object({
                    refreshToken: Joi.string().required(),
                }).label('UserLogoutPayload')
            },
        },
        handler: Handlers.logout
    });

    server.route({
        method: 'POST',
        path: '/auth/token',
        options: {
            auth: false,
            description: 'Get an access token with a refresh token',
            tags: ['api', 'auth'],
            validate: {
                payload: Joi.object({
                    refreshToken: Joi.string().required()
                }).label('GetTokenPayload')
            },
            pre: [
                {
                    assign: 'auth',
                    async method(request, h) {
                        return new AuthHelpers(options.auth)
                    }
                }
            ]
        },
        handler: Handlers.getNewAccessToken
    });
}
