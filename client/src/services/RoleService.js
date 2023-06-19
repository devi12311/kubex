import API from '@utils/plugins/API';

const RoleService = {
  all: (params) => {
    return API.get('/roles', { params });
  },
  find: (role) => {
    return API.get(`/roles/${role}`);
  },
  create: (name, description) => {
    return API.post('/roles', { name, description });
  },
  update: (role, name, description) => {
    return API.put(`/roles/${role}`, { name, description });
  },
  destroy: (role) => {
    return API.delete(`/roles/${role}`);
  },
  allPermissions: () => {
    return API.get('/permissions?no-pagination=true');
  },
  findPermissions: (role) => {
    return API.get(`/roles/${role}/permissions`);
  },
  assignPermissions: (role, permissionIds) => {
    return API.post(`/roles/${role}/permissions`, { permissionIds });
  }
};
export default RoleService;
