const k8s = require("@kubernetes/client-node");

class KubernetesService {
  constructor({ file, context, namespace }) {
    const kc = new k8s.KubeConfig();
    kc.loadFromString(file);
    kc.setCurrentContext(context);
    this.apiCoreV1 = kc.makeApiClient(k8s.CoreV1Api);
    this.apiAppsV1 = kc.makeApiClient(k8s.AppsV1Api);
    this.apiExtensionsV1beta1 = kc.makeApiClient(k8s.NetworkingV1Api);
    this.customObjectsApi = kc.makeApiClient(k8s.CustomObjectsApi);
    this.namespace = namespace;
  }

  async getNamespaces() {
    const { body } = await this.apiCoreV1.listNamespace();
    return body.items;
  }

  async createCustomObject(yaml, namespace) {
    const [group, version] = yaml.apiVersion.split("/");
    const { kind } = yaml;
    const plural = `${kind}s`;
    return await this.customObjectsApi.createNamespacedCustomObject(
      group,
      version,
      namespace,
      plural,
      yaml
    );
  }

  async getAllPods() {
    try {
      const response = await this.apiCoreV1.listPodForAllNamespaces();
      return response.body.items.length;
    } catch (error) {
      console.error("Error retrieving pods:", error.response.body.message);
      throw error;
    }
  }

  async getMaxPods() {
    try {
      const response = await this.apiCoreV1.listNode();
      const nodes = response.body.items;
      let maxPods = 0;

      nodes.forEach((node) => {
        const allocatablePods = node.status.allocatable.pods;
        if (allocatablePods) {
          maxPods += parseInt(allocatablePods);
        }
      });

      return maxPods;
    } catch (error) {
      console.error(
        "Error retrieving maximum pods:",
        error.response.body.message
      );
      throw error;
    }
  }

  async getAllocatedResources() {
    try {
      const response = await this.apiCoreV1.listNode();
      const nodes = response.body.items;
      let allocatedCPU = 0;
      let allocatedRAM = 0;

      nodes.forEach((node) => {
        const allocatableCPU = node.status.allocatable["cpu"];
        const allocatableRAM = node.status.allocatable["memory"];
        if (allocatableCPU && allocatableRAM) {
          allocatedCPU += parseInt(allocatableCPU);
          allocatedRAM += parseInt(allocatableRAM);
        }
      });

      return { allocatedCPU, allocatedRAM };
    } catch (error) {
      console.error(
        "Error retrieving allocated resources:",
        error.response.body.message
      );
      throw error;
    }
  }

  async getTotalResources() {
    try {
      const response = await this.apiCoreV1.listNode();
      console.log(response);
      const nodes = response.body.items;
      let totalCPU = 0;
      let totalRAM = 0;

      nodes.forEach((node) => {
        const capacityCPU = node.status.capacity["cpu"];
        const capacityRAM = node.status.capacity["memory"];
        if (capacityCPU && capacityRAM) {
          totalCPU += parseInt(capacityCPU);
          totalRAM += parseInt(capacityRAM);
        }
      });

      return { totalCPU, totalRAM };
    } catch (error) {
      console.error(
        "Error retrieving total resources:",
        error.response.body.message
      );
      throw error;
    }
  }

  async getClusterStatistics() {
    try {
      const namespaceCount = await this.getNamespaceCount();
      const podCount = await this.getPodCount();
      const deploymentCount = await this.getDeploymentCount();
      const statefulSetCount = await this.getStatefulSetCount();
      const serviceCount = await this.getServiceCount();
      const ingressCount = await this.getIngressCount();
      const pvcCount = await this.getPersistentVolumeClaimCount();

      const resources = [
        { label: "Namespaces", number: namespaceCount },
        { label: "Pods", number: podCount },
        { label: "Deployments", number: deploymentCount },
        { label: "StatefulSets", number: statefulSetCount },
        { label: "Services", number: serviceCount },
        { label: "Ingresses", number: ingressCount },
        { label: "PersistentVolumeClaims", number: pvcCount },
      ];

      const response = await k8s.topNodes(this.apiCoreV1);

      return {
        cluster: response,
        resources,
      };
    } catch (e) {
      throw e;
    }
  }

  async getNamespaceCount() {
    try {
      const response = await this.apiCoreV1.listNamespace();
      return response.body.items.length;
    } catch (error) {
      console.error(
        "Error retrieving namespaces:",
        error.response.body.message
      );
      throw error;
    }
  }

  async getPodCount() {
    try {
      const response = await this.apiCoreV1.listPodForAllNamespaces();
      return response.body.items.length;
    } catch (error) {
      console.error("Error retrieving pods:", error.response.body.message);
      throw error;
    }
  }

  async getDeploymentCount() {
    try {
      const response = await this.apiAppsV1.listDeploymentForAllNamespaces();
      return response.body.items.length;
    } catch (error) {
      console.error(
        "Error retrieving deployments:",
        error.response.body.message
      );
      throw error;
    }
  }

  async getStatefulSetCount() {
    try {
      const response = await this.apiAppsV1.listStatefulSetForAllNamespaces();
      return response.body.items.length;
    } catch (error) {
      console.error(
        "Error retrieving StatefulSets:",
        error.response.body.message
      );
      throw error;
    }
  }

  async getServiceCount() {
    try {
      const response = await this.apiCoreV1.listServiceForAllNamespaces();
      return response.body.items.length;
    } catch (error) {
      console.error("Error retrieving services:", error.response.body.message);
      throw error;
    }
  }

  async getIngressCount() {
    try {
      const response =
        await this.apiExtensionsV1beta1.listIngressForAllNamespaces();
      return response.body.items.length;
    } catch (error) {
      console.error("Error retrieving ingresses:", error.response.body.message);
      throw error;
    }
  }

  async getPersistentVolumeClaimCount() {
    try {
      const response =
        await this.apiCoreV1.listPersistentVolumeClaimForAllNamespaces();
      return response.body.items.length;
    } catch (error) {
      console.error(
        "Error retrieving PersistentVolumeClaims:",
        error.response.body.message
      );
      throw error;
    }
  }
}

module.exports = KubernetesService;
