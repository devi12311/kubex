const Boom = require('@hapi/boom');

module.exports = {

    getAll: async (request, h) => {
        const { ConfigMapManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace } = request.params;

        try {
            const configMapService = new ConfigMapManager({ file: kubeConfig, context, namespace });

            return await configMapService.listConfigMaps();
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    patch: async (request, h) => {
        const { ConfigMapManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace, name } = request.params;
        const { patch } = request.payload;

        try {
            const configMapService = new ConfigMapManager({ file: kubeConfig, context, namespace });

            if (!patch) {
                return await configMapService.getConfigMap(name);
            }

            return await configMapService.patchConfigMap(name, request.payload);

            //TODO fix patch

        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    getOne: async (request, h) => {
        const { ConfigMapManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace, name } = request.params;

        try {
            const configMapService = new ConfigMapManager({ file: kubeConfig, context, namespace });

            return await configMapService.getConfigMap(name);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    create: async (request, h) => {
        const { ConfigMapManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { metadata, data, immutable } = request.payload;
        const { namespace } = request.params;


        const configMapService = new ConfigMapManager({ file: kubeConfig, context, namespace });

        try {

            const newDeployment = {
                metadata, data, immutable
            }

            return await configMapService.createConfigMap(newDeployment);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }

    },

    delete: async (request, h) => {
        const { ConfigMapManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { name, namespace } = request.params;

        const configMapService = new ConfigMapManager({ file: kubeConfig, context, namespace });

        try {
            return await configMapService.deleteConfigMap(name);
        } catch (e) {
            return Boom.badRequest(e.body.message);
        }

    },
}
