
const k8s = require('@kubernetes/client-node');
const KubernetesService = class {

    constructor({ clusterUrl }) {

    }

    async initializeConfig () {
        const kc = new k8s.KubeConfig().loadFromFile();
    }
}

module.exports = KubernetesService
