const Boom = require('@hapi/boom');

module.exports = {

    getAll: async (request, h) => {
        const { IngressService } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace } = request.params;

        try {
            const ingressService = new IngressService({ file: kubeConfig, context, namespace });

            return ingressService.listIngresses();
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    getOne: async (request, h) => {
        const { IngressService } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace, name } = request.params;

        try {
            const ingressService = new IngressService({ file: kubeConfig, context, namespace });

            return await ingressService.getIngress(name);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    create: async (request, h) => {
        const { IngressService } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { metadata, spec } = request.payload;
        const { namespace } = request.params;


        const ingressService = new IngressService({ file: kubeConfig, context, namespace });

        try {

            const newService = {
                metadata, spec
            }

            return await ingressService.createIngress(newService);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }

    },

    delete: async (request, h) => {
        const { IngressService } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { name, namespace } = request.params;

        const ingressService = new IngressService({ file: kubeConfig, context, namespace });

        try {
            return await ingressService.deleteIngress(name);
        } catch (e) {
            return Boom.badRequest(e.body.message);
        }

    },
}
