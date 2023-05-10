'use strict';
const _modelMapper = (organization) => {
    return {
        id: organization.id,
        name: organization.username,
    };
};

const listMapper = (organizations) => {
    return { organizations: organizations.map(_modelMapper) };
}

const modelMapper = (organization) => {
    return { organization: _modelMapper(organization) };
};

module.exports = { _modelMapper, listMapper, modelMapper };
