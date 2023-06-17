const Boom = require('@hapi/boom');

module.exports = {

    getAll: async (request, h) => {
        const { SecretManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace } = request.params;

        try {
            const secretService = new SecretManager({ file: kubeConfig, context, namespace });

            return await secretService.listSecrets();
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    getOne: async (request, h) => {
        const { SecretManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace, name } = request.params;

        try {
            const secretService = new SecretManager({ file: kubeConfig, context, namespace });

            return await secretService.getSecret(name);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    create: async (request, h) => {
        const { SecretManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { metadata, data, type } = request.payload;
        const { namespace } = request.params;


        const secretService = new SecretManager({ file: kubeConfig, context, namespace });

        try {

            const newSecret = {
                metadata, data, type
            }

            return await secretService.createSecret(newSecret);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }

    },

    delete: async (request, h) => {
        const { SecretManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { name, namespace } = request.params;

        const secretService = new SecretManager({ file: kubeConfig, context, namespace });

        try {
            return await secretService.deleteSecret(name);
        } catch (e) {
            return Boom.badRequest(e.body.message);
        }

    },
}
