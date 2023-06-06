const k8s = require('@kubernetes/client-node');

class KubernetesService {
    constructor({ file, context, namespace }) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiCoreV1 = kc.makeApiClient(k8s.CoreV1Api);
        this.apiAppsV1 = kc.makeApiClient(k8s.AppsV1Api);
        this.namespace = namespace;
    }
    async getPods(namespace) {
        const { body } = await client.listNamespacedPod(namespace);
        return body.items;
    }

    async getNamespaces () {
        const { body } = await this.apiCoreV1.listNamespace();
        return body.items;
    }

    async createDeployment(namespace, deploymentName, image) {
        const client = this.configureClient();
        const deploymentManifest = {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: {
                name: deploymentName,
                namespace: namespace,
            },
            spec: {
                replicas: 1,
                selector: {
                    matchLabels: {
                        app: deploymentName,
                    },
                },
                template: {
                    metadata: {
                        labels: {
                            app: deploymentName,
                        },
                    },
                    spec: {
                        containers: [
                            {
                                name: deploymentName,
                                image: image,
                            },
                        ],
                    },
                },
            },
        };
        await client.createNamespacedDeployment(namespace, deploymentManifest);
    }


}

module.exports = KubernetesService;
