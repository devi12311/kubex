const Joi = require("joi");
const Handlers = require("./handlers");
module.exports = async (server, options) => {

    const { organization, cluster, context } = server.app.middlewares;

    server.route({
        method: 'POST',
        path: '/',
        options: {
            description: 'Get cluster namespaces',
            auth: {
                access: {
                    scope: ['user']
                }
            },
            pre: [
                organization,
                cluster,
                context
            ]
        },
        handler: Handlers.createCustomResource
    });

}
