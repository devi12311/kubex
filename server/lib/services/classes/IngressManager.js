const k8s = require('@kubernetes/client-node');

class IngressManager {
    constructor({ file, context, namespace }) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiExtensionsV1beta1 = kc.makeApiClient(k8s.NetworkingV1Api);
        this.namespace = namespace;
    }

    async createIngress(ingress) {
        const response = await this.apiExtensionsV1beta1.createNamespacedIngress(this.namespace, ingress);
        return response.body;
    }

    async getIngress(name) {
        const response = await this.apiExtensionsV1beta1.readNamespacedIngress(name, this.namespace);
        return response.body;
    }

    async listIngresses() {
        const response = await this.apiExtensionsV1beta1.listNamespacedIngress(this.namespace);
        return response.body.items;
    }

    async deleteIngress(name) {
        const response = await this.apiExtensionsV1beta1.deleteNamespacedIngress(name, this.namespace);
        return response.body;
    }
}

module.exports = IngressManager;
