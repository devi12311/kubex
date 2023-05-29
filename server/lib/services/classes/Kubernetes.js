const k8s = require('@kubernetes/client-node');

class KubernetesService {
    constructor() {
        this.kc = new k8s.KubeConfig();
    }

    async initializeConfig({ file }) {
        try {
            this.kc.loadFromString(file);
            this.kc.setCurrentContext('kubernetes-admin@k8s-clickflare');
        } catch (err) {
            console.log(err)
            throw new Error("Invalid kube config!")
        }
    }

    async getPods(namespace) {
        const k8sApi = this.kc.makeApiClient(k8s.CoreV1Api);
        const { body } = await k8sApi.listNamespacedPod(namespace);
        return body.items;
    }

    async getNamespaces () {
        const k8sApi = this.kc.makeApiClient(k8s.CoreV1Api);
        const { body } = await k8sApi.listNamespace();
        return body.items;
    }

    async createDeployment(namespace, deploymentName, image) {
        const k8sApi = this.kc.makeApiClient(k8s.AppsV1Api);
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
        await k8sApi.createNamespacedDeployment(namespace, deploymentManifest);
    }
}

module.exports = KubernetesService;
