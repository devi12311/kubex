const Joi = require("joi");
const Handlers = require("./handlers");
module.exports = async (server, options) => {

    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     options: {
    //         auth: {
    //             access: {
    //                 scope: ['user']
    //             }
    //         },
    //         payload: {
    //             output: 'stream',
    //             parse: true,
    //             allow: 'multipart/form-data',
    //             multipart: true,
    //         },
    //         validate: {
    //             params: Joi.object({
    //                 organizationId: Joi.string().uuid().required()
    //             }).required()
    //         },
    //         pre: [
    //             organization
    //         ]
    //     },
    //     handler: Handlers.create
    // });

}
