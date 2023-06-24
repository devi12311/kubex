const Boom = require("@hapi/boom");

module.exports = {
  getAll: async (request, h) => {
    const { NodeManager } = request.server.app.services;
    const { cluster, context } = request.pre;
    const { kubeConfig } = cluster;
    const { namespace } = request.params;

    try {
      const nodeService = new NodeManager({
        file: kubeConfig,
        context,
        namespace,
      });

      return await nodeService.listNodes();
    } catch (e) {
      console.log(e);
      return Boom.badRequest(e.body.message);
    }
  },

  getOne: async (request, h) => {
    const { NodeManager } = request.server.app.services;
    const { cluster, context } = request.pre;
    const { kubeConfig } = cluster;
    const { namespace, name } = request.params;

    try {
      const nodeService = new NodeManager({
        file: kubeConfig,
        context,
        namespace,
      });

      const node = await nodeService.getNode(name);
      const pods = await nodeService.listPodsForNode(name);

      return { node, pods };
    } catch (e) {
      console.log(e);
      return Boom.badRequest(e.body.message);
    }
  },

  delete: async (request, h) => {
    const { NodeManager } = request.server.app.services;
    const { cluster, context } = request.pre;
    const { kubeConfig } = cluster;
    const { name, namespace } = request.params;

    const nodeService = new NodeManager({
      file: kubeConfig,
      context,
      namespace,
    });

    try {
      return await nodeService.deleteNode(name);
    } catch (e) {
      return Boom.badRequest(e.body.message);
    }
  },
};
