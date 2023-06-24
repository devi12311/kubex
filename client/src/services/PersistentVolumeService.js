import API from '@utils/plugins/API';
import { orgClusterPathNamespace } from '@utils/helpers';

const PersistentVolumeService = {
  all: (namespace) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/pv`);
  },
  find: (namespace, id) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/pv/${id}`);
  },
  destroy: (namespace, id) => {
    return API.delete(`${orgClusterPathNamespace}/${namespace}/pv/${id}`);
  }
};

export default PersistentVolumeService;
