import API from '@utils/plugins/API';
import { orgClusterPathNamespace } from '@utils/helpers';

const IngressService = {
  all: (namespace) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/ingresses`);
  },
  find: (namespace, id) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/ingresses/${id}`);
  },
  destroy: (namespace, id) => {
    return API.delete(`${orgClusterPathNamespace}/${namespace}/ingresses/${id}`);
  }
};

export default IngressService;
