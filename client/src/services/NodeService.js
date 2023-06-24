import API from '@utils/plugins/API';
import { orgClusterPath } from '@utils/helpers';

const PersistentVolumeClaimService = {
  all: (namespace) => {
    return API.get(`${orgClusterPath}/nodes`);
  },
  find: (namespace, id) => {
    return API.get(`${orgClusterPath}/nodes/${id}`);
  },
  destroy: (namespace, id) => {
    return API.delete(`${orgClusterPath}/nodes/${id}`);
  }
};

export default PersistentVolumeClaimService;
