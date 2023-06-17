const k8s = require('@kubernetes/client-node');

class NodeManager {
    constructor({file, context, namespace}) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiCoreV1 = kc.makeApiClient(k8s.CoreV1Api);
        this.namespace = namespace;
    }

    async getNode(nodeName) {
        const response = await this.apiCoreV1.readNode(nodeName);
        return response.body;
    }

    async listNodes() {
        const response = await this.apiCoreV1.listNode();
        return response.body.items;
    }

    async deleteNode(nodeName) {
        const response = await this.apiCoreV1.deleteNode(nodeName);
        return response.body;
    }

    async listPodsForNode(nodeName) {
        const { body: namespaces } = await this.apiCoreV1.listNamespace();

        const namespaceNames =  namespaces.items.flatMap((namespace) => namespace.metadata.name);

        return await Promise.all(namespaceNames.map(async (namespace) => {
            const response = await this.apiCoreV1.listNamespacedPod(namespace, null, null, null, null, `spec.nodeName=${nodeName}`);
            return response.body
        }))
    }
}

module.exports = NodeManager;
