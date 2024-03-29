const Boom = require('@hapi/boom');

module.exports = {

    getAll: async (request, h) => {
        const { PodManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace } = request.params;

        try {
            const podService = new PodManager({ file: kubeConfig, context, namespace });

            return podService.getAllPods();
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    getOne: async (request, h) => {
        const { PodManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace, name } = request.params;

        try {
            const podService = new PodManager({ file: kubeConfig, context, namespace });

            return await podService.getPod(name);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    create: async (request, h) => {
        const { PodManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { metadata, spec } = request.payload;
        const { namespace } = request.params;


        const podService = new PodManager({ file: kubeConfig, context, namespace });

        try {

            const newPod = {
                metadata, spec
            }

            return await podService.createPod(newPod);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }

    },

    delete: async (request, h) => {
        const { PodManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { name, namespace } = request.params;

        const podService = new PodManager({ file: kubeConfig, context, namespace });

        try {
            return await podService.deletePod(name);
        } catch (e) {
            return Boom.badRequest(e.body.message);
        }

    },
}
