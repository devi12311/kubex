import API from '@utils/plugins/API';

const UserService = {
  all: (params) => {
    return API.get('users', { params });
  },
  create: (name, username, password, passwordConfirmation, roleId) => {
    return API.post('users', {
      name,
      username,
      password,
      passwordConfirmation,
      roleIds: [roleId]
    });
  },
  update: (id, name, username) => {
    return API.put(`users/${id}`, {
      name,
      username
    });
  },
  find: (id) => {
    return API.get(`users/${id}`);
  },
  destroy: (id) => {
    return API.delete(`users/${id}`);
  },
  toggleStatus: (id) => {
    return API.patch(`users/${id}/toggle-status`);
  },
  changePassword: (id, password, passwordConfirmation) => {
    return API.patch(`users/${id}/change-password`, {
      password,
      passwordConfirmation
    });
  }
};

export default UserService;
