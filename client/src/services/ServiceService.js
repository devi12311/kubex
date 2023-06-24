import API from '@utils/plugins/API';
import { orgClusterPathNamespace } from '@utils/helpers';

const ServiceService = {
  all: (namespace) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/services`);
  },
  find: (namespace, id) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/services/${id}`);
  },
  destroy: (namespace, id) => {
    return API.delete(`${orgClusterPathNamespace}/${namespace}/services/${id}`);
  }
};

export default ServiceService;
