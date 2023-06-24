import API from '@utils/plugins/API';
import { orgClusterPathNamespace } from '@utils/helpers';

const StatefulSetService = {
  all: (namespace) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/stateful-sets`);
  },
  find: (namespace, id) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/stateful-sets/${id}`);
  },
  destroy: (namespace, id) => {
    return API.delete(`${orgClusterPathNamespace}/${namespace}/stateful-sets/${id}`);
  }
};

export default StatefulSetService;
