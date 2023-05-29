const Joi = require("joi");
const Handlers = require("./handlers");
module.exports = async (server, options) => {

    const { organization, cluster } = server.app.middlewares;

    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: {
                access: {
                    scope: ['user']
                }
            },
            validate: {
                params: Joi.object({
                    organizationId: Joi.string().uuid().required(),
                    clusterId: Joi.string().uuid().required(),
                }).required()
            },
            pre: [
                organization,
                cluster
            ]
        },
        handler: Handlers.getPods
    });

}
