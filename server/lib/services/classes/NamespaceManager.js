const k8s = require('@kubernetes/client-node');

class NamespaceManager {
    constructor({ file, context, namespace }) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiCoreV1 = kc.makeApiClient(k8s.CoreV1Api);
        this.apiAppsV1 = kc.makeApiClient(k8s.AppsV1Api);
        this.namespace = namespace;
    }

    async deleteNamespace(namespace) {
        const response = await this.apiCoreV1.deleteNamespace(namespace);
        return response.body;
    }

    async getNamespaces () {
        const { body } = await this.apiCoreV1.listNamespace();
        return body.items;
    }
    async createNamespace (name) {

        const namespace = {
            metadata: {
                name,
            },
        };

        return await this.apiCoreV1.createNamespace(namespace);

    }
}

module.exports = NamespaceManager;
