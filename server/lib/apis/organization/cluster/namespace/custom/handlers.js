const Boom = require('@hapi/boom');
const yaml = require('yaml');
module.exports = {

    createCustomResource: async (request, h) => {
        const { Kubernetes } = request.server.app.services;
        const { cluster, context } = request.pre;
        const { namespace } = request.params;
        const { kubeConfig } = cluster;
        const payload = request.payload;

        try {
            const namespaceService = new Kubernetes({ file: kubeConfig, context, namespace });

            const resourceObject = yaml.parse(payload);

            return await namespaceService.createCustomObject(resourceObject, namespace);

            //TODO fix implementation
        } catch (e) {
            console.log(e)
            return Boom.badImplementation(e)
        }
    }
}
