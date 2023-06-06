'use strict';

const KubernetesService = require('./classes/Kubernetes');
const NamespaceManager = require('./classes/NamespaceManager');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        server.app.services = {
            Kubernetes: KubernetesService,
            NamespaceManager: NamespaceManager
        };
    }
};
