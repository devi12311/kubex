const k8s = require('@kubernetes/client-node');

class ServiceManager {
    constructor({ file, context, namespace }) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiCoreV1 = kc.makeApiClient(k8s.CoreV1Api);
        this.namespace = namespace;
    }

    async createService(service) {
        const response = await this.apiCoreV1.createNamespacedService(this.namespace, service);
        return response.body;
    }

    async getService(name) {
        const response = await this.apiCoreV1.readNamespacedService(name, this.namespace);
        return response.body;
    }

    async listServices() {
        const response = await this.apiCoreV1.listNamespacedService(this.namespace);
        return response.body.items;
    }

    async deleteService(name) {
        const response = await this.apiCoreV1.deleteNamespacedService(name, this.namespace);
        return response.body;
    }
}

module.exports = ServiceManager;
