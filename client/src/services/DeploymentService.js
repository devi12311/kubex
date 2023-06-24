import API from '@utils/plugins/API';
import { orgClusterPathNamespace } from '@utils/helpers';

const DeploymentService = {
  all: (namespace) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/deployments`);
  },
  find: (namespace, id) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/deployments/${id}`);
  },
  destroy: (namespace, id) => {
    return API.delete(`${orgClusterPathNamespace}/${namespace}/deployments/${id}`);
  }
};

export default DeploymentService;
