'use strict';

const KubernetesService = require('./classes/Kubernetes');
const NamespaceManager = require('./classes/NamespaceManager');
const PodManager = require('./classes/PodManager');
const DeploymentManager = require ('./classes/DeploymentManager');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        server.app.services = {
            Kubernetes: KubernetesService,
            NamespaceManager,
            PodManager,
            DeploymentManager
        };
    }
};
