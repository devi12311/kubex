const k8s = require('@kubernetes/client-node');

class StatefulSetManager {
    constructor({ file, context, namespace }) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiAppsV1 = kc.makeApiClient(k8s.AppsV1Api);
        this.namespace = namespace;
    }

    async createStatefulSet(statefulSet) {
        const response = await this.apiAppsV1.createNamespacedStatefulSet(this.namespace, statefulSet);
        return response.body;
    }

    async getStatefulSet(name) {
        const response = await this.apiAppsV1.readNamespacedStatefulSet(name, this.namespace);
        return response.body;
    }

    async listStatefulSets() {
        const response = await this.apiAppsV1.listNamespacedStatefulSet(this.namespace);
        return response.body.items;
    }

    async deleteStatefulSet(name) {
        const response = await this.apiAppsV1.deleteNamespacedStatefulSet(name, this.namespace);
        return response.body;
    }
}

module.exports = StatefulSetManager;
