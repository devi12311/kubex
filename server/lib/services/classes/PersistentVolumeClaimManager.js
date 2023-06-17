const k8s = require('@kubernetes/client-node');

class PersistentVolumeClaimManager {
    constructor({file, context, namespace}) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiCoreV1 = kc.makeApiClient(k8s.CoreV1Api);
        this.namespace = namespace;
    }

    async createPersistentVolumeClaim(pvc) {
        const response = await this.apiCoreV1.createNamespacedPersistentVolumeClaim(this.namespace, pvc);
        return response.body;
    }

    async getPersistentVolumeClaim(pvcName) {
        const response = await this.apiCoreV1.readNamespacedPersistentVolumeClaim(pvcName, this.namespace);
        return response.body;
    }

    async updatePersistentVolumeClaim(pvcName, pvc) {
        const response = await this.apiCoreV1.replaceNamespacedPersistentVolumeClaim(pvcName, this.namespace, pvc);
        return response.body;
    }

    async deletePersistentVolumeClaim(pvcName) {
        const response = await this.apiCoreV1.deleteNamespacedPersistentVolumeClaim(pvcName, this.namespace);
        return response.body;
    }

    async listPersistentVolumeClaims() {
        const response = await this.apiCoreV1.listNamespacedPersistentVolumeClaim(this.namespace);
        return response.body.items;
    }
}

module.exports = PersistentVolumeClaimManager;
