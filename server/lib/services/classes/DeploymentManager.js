const k8s = require('@kubernetes/client-node');

class DeploymentManager {
    constructor({ file, context, namespace }) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiAppsV1 = kc.makeApiClient(k8s.AppsV1Api);
        this.namespace = namespace;
    }

    async createDeployment(deployment) {
        const response = await this.apiAppsV1.createNamespacedDeployment(this.namespace, deployment);
        return response.body;
    }

    async getAllDeployments() {
        const response = await this.apiAppsV1.listNamespacedDeployment(this.namespace);
        return response.body.items;
    }

    async getDeployment(deploymentName) {
        const response = await this.apiAppsV1.readNamespacedDeployment(deploymentName, this.namespace);
        return response.body;
    }

    async deleteDeployment(deploymentName) {
        const response = await this.apiAppsV1.deleteNamespacedDeployment(deploymentName, this.namespace);
        return response.body;
    }

    async patchDeployment(deploymentName, patch) {
        const response = await this.apiAppsV1.patchNamespacedDeployment(
            deploymentName,
            this.namespace,
            patch,
            undefined,
            undefined,
            undefined,
            undefined,
            { headers: { 'Content-Type': 'application/strategic-merge-patch+json' } }
        );
        return response.body;
    }
}

module.exports = DeploymentManager;
