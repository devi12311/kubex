const Boom = require('@hapi/boom');

module.exports = {

    getAll: async (request, h) => {
        const { NamespaceManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;

        try {
            const namespaceService = new NamespaceManager({ file: kubeConfig, context });

            return namespaceService.getNamespaces();
        } catch (e) {
            console.log(e)
            return Boom.badImplementation(e)
        }
    },

    create: async (request, h) => {
        const { NamespaceManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { name } = request.payload;

        const namespaceService = new NamespaceManager({ file: kubeConfig, context });

        try {
            return await namespaceService.createNamespace(name);
        } catch (e) {
            return Boom.badRequest(e.body.message);
        }

    },

    delete: async (request, h) => {
        const { NamespaceManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { name } = request.params;

        const namespaceService = new NamespaceManager({ file: kubeConfig, context });

        try {
            return await namespaceService.deleteNamespace(name);
        } catch (e) {
            return Boom.badRequest(e.body.message);
        }


        //TODO error check if namespace already exists

    },
}
