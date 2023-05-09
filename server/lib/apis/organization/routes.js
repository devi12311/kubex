const Handlers = require('./handlers');
const Joi = require('joi');

module.exports = async (server, options) => {

    server.route({
        method: 'POST',
        path: '/',
        options: {
            auth: {
                access: {
                    scope: ['user']
                }
            },
            description: 'Create an organization',
            validate: {
                payload: Joi.object({
                    name: Joi.string().required()
                })
            },
        },
        handler: Handlers.create
    });

    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     options: {
    //         auth: false,
    //         description: 'Register route',
    //         validate: {
    //             payload: Joi.object({
    //                 username: Joi.string().required(),
    //                 password: Joi.string().required(),
    //             })
    //         },
    //         pre: [
    //             {
    //                 assign: 'auth',
    //                 async method(request, h) {
    //                     return new AuthHelpers(options.auth)
    //                 }
    //             },
    //         ],
    //     },
    //     handler: Handlers.login
    // });
}
