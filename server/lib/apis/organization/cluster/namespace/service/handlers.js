const Boom = require('@hapi/boom');

module.exports = {

    getAll: async (request, h) => {
        const { ServiceManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace } = request.params;

        try {
            const serviceService = new ServiceManager({ file: kubeConfig, context, namespace });

            return serviceService.listServices();
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    getOne: async (request, h) => {
        const { ServiceManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace, name } = request.params;

        try {
            const serviceService = new ServiceManager({ file: kubeConfig, context, namespace });

            return await serviceService.getService(name);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    create: async (request, h) => {
        const { ServiceManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { metadata, spec } = request.payload;
        const { namespace } = request.params;


        const serviceService = new ServiceManager({ file: kubeConfig, context, namespace });

        try {

            const newService = {
                metadata, spec
            }

            return await serviceService.createService(newService);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }

    },

    delete: async (request, h) => {
        const { ServiceManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { name, namespace } = request.params;

        const serviceService = new ServiceManager({ file: kubeConfig, context, namespace });

        try {
            return await serviceService.deleteService(name);
        } catch (e) {
            return Boom.badRequest(e.body.message);
        }

    },
}
