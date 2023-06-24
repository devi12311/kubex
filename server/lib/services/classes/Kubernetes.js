const k8s = require("@kubernetes/client-node");

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
    const { totalCPU, totalRAM } = await this.getTotalResources();
    console.log("gotit");
    const { allocatedCPU, allocatedRAM } = await this.getAllocatedResources();
    console.log("gotit");
    const maxPods = await this.getMaxPods();
    console.log("gotit");
    const allocatedPods = await this.getAllPods();
    console.log("gotit");

    return {
      ram: {
        totalRAM,
        allocatedRAM,
      },
      cpu: {
        totalCPU,
        allocatedCPU,
      },
      pods: {
        maxPods,
        allocatedPods,
      },
    };
  }
}

module.exports = KubernetesService;
