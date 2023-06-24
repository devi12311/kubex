const Boom = require("@hapi/boom");

module.exports = {
  getAll: async (request, h) => {
    const { DeploymentManager } = request.server.app.services;
    const { cluster, context } = request.pre;
    const { kubeConfig } = cluster;
    const { namespace } = request.params;

    try {
      const deploymentService = new DeploymentManager({
        file: kubeConfig,
        context,
        namespace,
      });

      return deploymentService.getAllDeployments();
    } catch (e) {
      console.log(e);
      return Boom.badRequest(e.body.message);
    }
  },

  patch: async (request, h) => {
    const { DeploymentManager } = request.server.app.services;
    const { cluster, context } = request.pre;
    const { kubeConfig } = cluster;
    const { namespace, name } = request.params;
    const { patch } = request.payload;

    try {
      const deploymentService = new DeploymentManager({
        file: kubeConfig,
        context,
        namespace,
      });

      if (!patch) {
        return await deploymentService.getDeployment(name);
      }

      return await deploymentService.patchDeployment(name, patch);
    } catch (e) {
      console.log(e);
      return Boom.badRequest(e.body.message);
    }
  },

  getOne: async (request, h) => {
    const { DeploymentManager } = request.server.app.services;
    const { cluster, context } = request.pre;
    const { kubeConfig } = cluster;
    const { namespace, name } = request.params;

    try {
      const deploymentService = new DeploymentManager({
        file: kubeConfig,
        context,
        namespace,
      });

      return await deploymentService.getDeployment(name);
    } catch (e) {
      console.log(e);
      return Boom.badRequest(e.body.message);
    }
  },

  create: async (request, h) => {
    const { DeploymentManager } = request.server.app.services;
    const { cluster, context } = request.pre;
    const { kubeConfig } = cluster;
    const { metadata, spec } = request.payload;
    const { namespace } = request.params;

    const deploymentService = new DeploymentManager({
      file: kubeConfig,
      context,
      namespace,
    });

    try {
      const newDeployment = {
        metadata,
        spec,
      };

      return await deploymentService.createDeployment(newDeployment);
    } catch (e) {
      console.log(e);
      return Boom.badRequest(e.body.message);
    }
  },

  delete: async (request, h) => {
    const { DeploymentManager } = request.server.app.services;
    const { cluster, context } = request.pre;
    const { kubeConfig } = cluster;
    const { name, namespace } = request.params;

    const deploymentService = new DeploymentManager({
      file: kubeConfig,
      context,
      namespace,
    });

    try {
      return await deploymentService.deleteDeployment(name);
    } catch (e) {
      return Boom.badRequest(e.body.message);
    }
  },
};
