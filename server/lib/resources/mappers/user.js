'use strict';
const _modelMapper = (user) => {
    return {
        id: user.id,
        username: user.username,
        email: user.email
    };
};

const listMapper = (users) => {
    return { users: users.map(_modelMapper) };
}

const modelMapper = (user) => {
    return { user: _modelMapper(user) };
};

module.exports = { _modelMapper, listMapper, modelMapper };
