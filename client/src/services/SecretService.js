import API from '@utils/plugins/API';
import { orgClusterPathNamespace } from '@utils/helpers';

const SecretService = {
  all: (namespace) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/secrets`);
  },
  find: (namespace, id) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/secrets/${id}`);
  },
  destroy: (namespace, id) => {
    return API.delete(`${orgClusterPathNamespace}/${namespace}/secrets/${id}`);
  }
};

export default SecretService;
