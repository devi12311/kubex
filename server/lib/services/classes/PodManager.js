const k8s = require('@kubernetes/client-node');

class PodManager {
    constructor({ file, context, namespace }) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiCoreV1 = kc.makeApiClient(k8s.CoreV1Api);
        this.namespace = namespace;
    }

    async createPod(pod) {
        const response = await this.apiCoreV1.createNamespacedPod(this.namespace, pod);
        return response.body;
    }

    async getAllPods() {
        const response = await this.apiCoreV1.listNamespacedPod(this.namespace);
        return response.body.items;
    }

    async deletePod(podName) {
        const response = await this.apiCoreV1.deleteNamespacedPod(podName, this.namespace);
        return response.body;
    }

    async getPod(podName) {
        const response = await this.apiCoreV1.readNamespacedPod(podName, this.namespace);
        return response.body;
    }
}

module.exports = PodManager;
