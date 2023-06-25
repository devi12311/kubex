const Handlers = require("./handlers");
const Joi = require("joi");
const Boom = require("@hapi/boom");

module.exports = async (server, options) => {
  const { organization, cluster, context } = server.app.middlewares;

  server.route({
    method: "POST",
    path: "/",
    options: {
      auth: {
        access: {
          scope: ["user"],
        },
      },
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
      },
      validate: {
        params: Joi.object({
          organizationId: Joi.string().uuid().required(),
        }).required(),
      },
      pre: [organization],
    },
    handler: Handlers.create,
  });

  server.route({
    method: "GET",
    path: "/",
    options: {
      auth: {
        access: {
          scope: ["user"],
        },
      },
      description: "Get users clusters",
      validate: {
        params: Joi.object({
          organizationId: Joi.string().uuid().required(),
        }).required(),
      },
      pre: [
        organization,
        {
          assign: "mapper",
          async method(request, h) {
            return server.app.resources.cluster.listMapper;
          },
        },
      ],
    },
    handler: Handlers.getAll,
  });

  server.route({
    method: "GET",
    path: "/{clusterId}",
    options: {
      auth: {
        access: {
          scope: ["user"],
        },
      },
      description: "Get clusters of an organization",
      validate: {
        params: Joi.object({
          organizationId: Joi.string().uuid().required(),
          clusterId: Joi.string().uuid().required(),
        }).required(),
      },
      pre: [
        organization,
        cluster,
        {
          assign: "mapper",
          async method(request, h) {
            return server.app.resources.cluster.modelMapper;
          },
        },
      ],
    },
    handler: async (request, h) => {
      return request.pre.mapper(request.pre.cluster);
    },
  });

  server.route({
    method: "GET",
    path: "/{clusterId}/resources",
    options: {
      auth: {
        access: {
          scope: ["user"],
        },
      },
      description: "Get clusters resources",
      validate: {
        params: Joi.object({
          organizationId: Joi.string().uuid().required(),
          clusterId: Joi.string().uuid().required(),
        }).required(),
      },
      pre: [
        organization,
        cluster,
        context,
        {
          assign: "mapper",
          async method(request, h) {
            return server.app.resources.cluster.modelMapper;
          },
        },
      ],
    },
    handler: Handlers.getResources,
  });

  server.route({
    method: "DELETE",
    path: "/{clusterId}",
    options: {
      auth: {
        access: {
          scope: ["user"],
        },
      },
      description: "Delete cluster",
      validate: {
        params: Joi.object({
          organizationId: Joi.string().uuid().required(),
          clusterId: Joi.string().uuid().required(),
        }).required(),
      },
      pre: [organization, cluster],
    },
    handler: async (request, h) => {
      const { cluster } = request.pre;
      await cluster.destroy();
      return { message: "Cluster deleted" };
    },
  });
};
