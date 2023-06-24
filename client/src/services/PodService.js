import API from '@utils/plugins/API';
import { orgClusterPathNamespace } from '@utils/helpers';

const PodService = {
  all: (namespace) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/pods`);
  },
  find: (namespace, id) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/pods/${id}`);
  },
  destroy: (namespace, id) => {
    return API.delete(`${orgClusterPathNamespace}/${namespace}/pods/${id}`);
  }
};

export default PodService;
