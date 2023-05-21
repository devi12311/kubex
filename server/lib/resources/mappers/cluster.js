'use strict';
const _modelMapper = (cluster) => {
    return {
        id: cluster.id,
        name: cluster.username,
        kubeConfig: cluster.kubeConfig,
    };
};

const listMapper = (clusters) => {
    return { clusters: clusters.map(_modelMapper) };
}

const modelMapper = (cluster) => {
    return { cluster: _modelMapper(cluster) };
};

module.exports = { _modelMapper, listMapper, modelMapper };
