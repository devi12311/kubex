'use strict';

const KubernetesService = require('./classes/Kubernetes');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        server.app.services = {
            kubernetes: KubernetesService
        };
    }
};
