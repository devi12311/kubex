const Boom = require('@hapi/boom');

module.exports = {

    getAll: async (request, h) => {
        const { PersistentVolumeManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace } = request.params;

        try {
            const persistentVolumeService = new PersistentVolumeManager({ file: kubeConfig, context, namespace });

            return await persistentVolumeService.listPersistentVolumes();
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    getOne: async (request, h) => {
        const { PersistentVolumeManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { namespace, name } = request.params;

        try {
            const persistentVolumeService = new PersistentVolumeManager({ file: kubeConfig, context, namespace });

            return await persistentVolumeService.getPersistentVolume(name);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }
    },

    create: async (request, h) => {
        const { PersistentVolumeManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { metadata, spec } = request.payload;
        const { namespace } = request.params;


        const persistentVolumeService = new PersistentVolumeManager({ file: kubeConfig, context, namespace });

        try {

            const newSecret = {
                metadata, spec
            }

            return await persistentVolumeService.createPersistentVolume(newSecret);
        } catch (e) {
            console.log(e)
            return Boom.badRequest(e.body.message);
        }

    },

    delete: async (request, h) => {
        const { PersistentVolumeManager } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { kubeConfig } = cluster;
        const { name, namespace } = request.params;

        const persistentVolumeService = new PersistentVolumeManager({ file: kubeConfig, context, namespace });

        try {
            return await persistentVolumeService.deletePersistentVolume(name);
        } catch (e) {
            return Boom.badRequest(e.body.message);
        }

    },
}
