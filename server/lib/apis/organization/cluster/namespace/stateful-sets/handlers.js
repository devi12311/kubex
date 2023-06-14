const Boom = require('@hapi/boom');

module.exports = {

    getAll: async (request, h) => {
        const { StatefulSetManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace } = request.params;

        try {
            const statefulSetService = new StatefulSetManager({ file: kubeConfig, context, namespace });

            return statefulSetService.listStatefulSets();
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    create: async (request, h) => {
        const { StatefulSetManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { metadata, spec } = request.payload;
        const { namespace } = request.params;


        const statefulSetService = new StatefulSetManager({ file: kubeConfig, context, namespace });

        try {

            const newStatefulSet = {
                metadata, spec
            }

            return await statefulSetService.createStatefulSet(newStatefulSet);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }

    },

    patch: async (request, h) => {
        const { StatefulSetManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace, name } = request.params;
        const { patch } = request.payload;

        try {
            const statefulSetService = new StatefulSetManager({ file: kubeConfig, context, namespace });

            if (!patch) {
                return await statefulSetService.getDeployment(name);
            }

            return await statefulSetService.patchDeployment(name, patch);

            //TODO implement

        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    getOne: async (request, h) => {
        const { StatefulSetManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace, name } = request.params;

        try {
            const statefulSetService = new StatefulSetManager({ file: kubeConfig, context, namespace });

            return await statefulSetService.getStatefulSet(name);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    delete: async (request, h) => {
        const { StatefulSetManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { name, namespace } = request.params;

        const statefulSetService = new StatefulSetManager({ file: kubeConfig, context, namespace });

        try {
            return await statefulSetService.deleteStatefulSet(name);
        } catch (e) {
            return Boom.badRequest(e.body.message);
        }

    },
}
