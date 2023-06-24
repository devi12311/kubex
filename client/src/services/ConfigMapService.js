import API from '@utils/plugins/API';
import { orgClusterPathNamespace } from '@utils/helpers';

const ConfigMapService = {
  all: (namespace) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/configmaps`);
  },
  find: (namespace, id) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/configmaps/${id}`);
  },
  destroy: (namespace, id) => {
    return API.delete(`${orgClusterPathNamespace}/${namespace}/configmaps/${id}`);
  }
};

export default ConfigMapService;
