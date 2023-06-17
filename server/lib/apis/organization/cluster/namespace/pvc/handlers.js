const Boom = require('@hapi/boom');

module.exports = {

    getAll: async (request, h) => {
        const { PersistentVolumeClaimManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace } = request.params;

        try {
            const persistentVolumeClaimService = new PersistentVolumeClaimManager({ file: kubeConfig, context, namespace });

            return await persistentVolumeClaimService.listPersistentVolumeClaims();
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    getOne: async (request, h) => {
        const { PersistentVolumeClaimManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace, name } = request.params;

        try {
            const persistentVolumeClaimService = new PersistentVolumeClaimManager({ file: kubeConfig, context, namespace });

            return await persistentVolumeClaimService.getPersistentVolumeClaim(name);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    create: async (request, h) => {
        const { PersistentVolumeClaimManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { metadata, spec } = request.payload;
        const { namespace } = request.params;


        const persistentVolumeClaimService = new PersistentVolumeClaimManager({ file: kubeConfig, context, namespace });

        try {

            const newSecret = {
                metadata, spec
            }

            return await persistentVolumeClaimService.createPersistentVolumeClaim(newSecret);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }

    },

    delete: async (request, h) => {
        const { PersistentVolumeClaimManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { name, namespace } = request.params;

        const persistentVolumeClaimService = new PersistentVolumeClaimManager({ file: kubeConfig, context, namespace });

        try {
            return await persistentVolumeClaimService.deletePersistentVolumeClaim(name);
        } catch (e) {
            return Boom.badRequest(e.body.message);
        }

    },
}
