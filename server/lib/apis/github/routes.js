const Handlers = require('./handlers');
const Joi = require('joi');

module.exports = async (server, options) => {

    server.route({
        method: 'GET',
        path: '/',
        options: {
            description: 'Get user profile github',
            validate: {},
        },
        handler: Handlers.getUserProfile
    });

    server.route({
        method: 'GET',
        path: '/repos',
        options: {
            description: 'Get user repos',
            validate: {
                query: Joi.object({
                    token: Joi.string().required()
                })
            },
        },
        handler: Handlers.getUserRepos
    });

    server.route({
        method: 'POST',
        path: '/repos/save',
        options: {
            description: 'Save user repos',
            validate: {
                query: Joi.object({
                    token: Joi.string().required()
                }),
                payload: Joi.object({
                    repos: Joi.array().items(Joi.object({
                        id: Joi.number().required(),
                        name: Joi.string().required(),
                        isPrivate: Joi.boolean().required(),
                        url: Joi.string().required()
                    })),
                }),
            },
        },
        handler: Handlers.saveRepos
    });
}