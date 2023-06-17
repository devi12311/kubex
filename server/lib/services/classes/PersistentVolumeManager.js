const k8s = require('@kubernetes/client-node');

class PersistentVolumeManager {
    constructor({file, context, namespace}) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiCoreV1 = kc.makeApiClient(k8s.CoreV1Api);
        this.namespace = namespace;
    }

    async createPersistentVolume(pv) {
        const response = await this.apiCoreV1.createPersistentVolume(pv);
        return response.body;
    }

    async getPersistentVolume(pvName) {
        const response = await this.apiCoreV1.readPersistentVolume(pvName);
        return response.body;
    }
    async deletePersistentVolume(pvName) {
        const response = await this.apiCoreV1.deletePersistentVolume(pvName);
        return response.body;
    }

    async listPersistentVolumes() {
        const response = await this.apiCoreV1.listPersistentVolume();
        return response.body.items;
    }
}

module.exports = PersistentVolumeManager;
