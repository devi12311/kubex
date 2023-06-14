'use strict';

const KubernetesService = require('./classes/Kubernetes');
const NamespaceManager = require('./classes/NamespaceManager');
const PodManager = require('./classes/PodManager');
const DeploymentManager = require ('./classes/DeploymentManager');
const StatefulSetManager = require('./classes/StatefulSetManager');
const ServiceManager = require('./classes/ServiceManager');
const IngressManager = require('./classes/IngressManager');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        server.app.services = {
            Kubernetes: KubernetesService,
            NamespaceManager,
            PodManager,
            DeploymentManager,
            StatefulSetManager,
            ServiceManager,
            IngressManager
        };
    }
};
