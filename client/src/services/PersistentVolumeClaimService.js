import API from '@utils/plugins/API';
import { orgClusterPathNamespace } from '@utils/helpers';

const PersistentVolumeClaimService = {
  all: (namespace) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/pvc`);
  },
  find: (namespace, id) => {
    return API.get(`${orgClusterPathNamespace}/${namespace}/pvc/${id}`);
  },
  destroy: (namespace, id) => {
    return API.delete(`${orgClusterPathNamespace}/${namespace}/pvc/${id}`);
  }
};

export default PersistentVolumeClaimService;
