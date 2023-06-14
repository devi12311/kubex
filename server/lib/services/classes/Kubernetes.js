const k8s = require('@kubernetes/client-node');

class KubernetesService {
    constructor({ file, context, namespace }) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiCoreV1 = kc.makeApiClient(k8s.CoreV1Api);
        this.apiAppsV1 = kc.makeApiClient(k8s.AppsV1Api);
        this.customObjectsApi = kc.makeApiClient(k8s.CustomObjectsApi);
        this.namespace = namespace;
    }

    async getNamespaces () {
        const { body } = await this.apiCoreV1.listNamespace();
        return body.items;
    }


    async createCustomObject (yaml, namespace) {
        const [group, version] = yaml.apiVersion.split('/');
        const { kind } = yaml;
        const plural = `${kind}s`;
        return await this.customObjectsApi.createNamespacedCustomObject(
            group ,
            version,
            namespace,
            plural,
            yaml
        );

    }
}

module.exports = KubernetesService;
