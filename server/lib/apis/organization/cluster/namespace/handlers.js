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

        return await namespaceService.createNamespace(name);

        //TODO error check if namespace already exists

    },

    delete: async (request, h) => {
        const { NamespaceManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { name } = request.payload;

        const namespaceService = new NamespaceManager({ file: kubeConfig, context });

        return await namespaceService.deleteNamespace(name);

        //TODO error check if namespace already exists

    },
}
