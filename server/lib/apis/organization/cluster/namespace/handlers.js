module.exports = {

    getAll: async (request, h) => {
        const { Kubernetes } = request.server.app.services;
        const { cluster } = request.pre;
        const { kubeConfig } = cluster;

        try {
            const kubernetesService = new Kubernetes();

            await kubernetesService.initializeConfig({file: kubeConfig});

            return kubernetesService.getNamespaces();
        } catch (e) {
            console.log(e)
        }
    },

    getPods: async (request, h) => {
        const { Kubernetes } = request.server.app.services;
        const { cluster } = request.pre;
        const { kubeConfig } = cluster;

        try {
            const kubernetesService = new Kubernetes();

            await kubernetesService.initializeConfig({file: kubeConfig});

            return kubernetesService.getPods('apisix');
        } catch (e) {
            console.log(e)
        }
    }
}
