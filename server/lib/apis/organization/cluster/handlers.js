const Boom = require("@hapi/boom");

module.exports = {
  create: async (request, h) => {
    const { kubeconfig, name } = request.payload;
    const { organization } = request.pre;
    const { Cluster } = request.server.app.models;
    const file = kubeconfig._data;

    try {
      const cluster = await Cluster.create({
        name,
        kubeConfig: file.toString(),
        organizationId: organization.id,
      });
      return h
        .response({ message: "Cluster created successfully", cluster })
        .code(201);
    } catch (error) {
      return h.response({ message: "Error creating cluster", error }).code(500);
    }
  },

  getAll: async (request, h) => {
    const { organization, mapper } = request.pre;
    const { Cluster } = request.server.app.models;

    const clusters = await Cluster.findAll({
      where: {
        organizationId: organization.id,
      },
    });

    return mapper(clusters);
  },

  getResources: async (request, h) => {
    const { Kubernetes } = request.server.app.services;
    const { cluster, context } = request.pre;
    const { kubeConfig } = cluster;
    const { name, namespace } = request.params;

    const kubernetesService = new Kubernetes({
      file: kubeConfig,
      context,
      namespace,
    });

    try {
      return await kubernetesService.getClusterStatistics();
    } catch (e) {
      console.log(e);
      return Boom.badRequest(e);
    }
  },
};
