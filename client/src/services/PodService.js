import API from '@utils/plugins/API';
import { orgClusterPath } from '@utils/helpers';

const PodService = {
  all: (params) => {
    return API.get(`${orgClusterPath}/pods`, { params });
  },
  find: (id) => {
    return API.get(`users/${id}`);
  },
  destroy: (id) => {
    return API.delete(`${orgClusterPath}/pods/${id}`);
  }
};

export default PodService;
