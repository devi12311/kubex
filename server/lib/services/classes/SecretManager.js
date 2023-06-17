const k8s = require('@kubernetes/client-node');

class SecretManager {
    constructor({file, context, namespace}) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiCoreV1 = kc.makeApiClient(k8s.CoreV1Api);
        this.namespace = namespace;
    }

    async createSecret(secret) {
        const response = await this.apiCoreV1.createNamespacedSecret(this.namespace, secret);
        return response.body;
    }

    async updateSecret(secretName, secret) {
        const response = await this.apiCoreV1.replaceNamespacedSecret(secretName, this.namespace, secret);
        return response.body;
    }

    async deleteSecret(secretName) {
        const response = await this.apiCoreV1.deleteNamespacedSecret(secretName, this.namespace);
        return response.body;
    }

    async listSecrets() {
        const response = await this.apiCoreV1.listNamespacedSecret(this.namespace);
        return response.body.items;
    }
    async getSecret(secretName) {
        const response = await this.apiCoreV1.readNamespacedSecret(secretName, this.namespace);
        return response.body;
    }

}

module.exports = SecretManager;
