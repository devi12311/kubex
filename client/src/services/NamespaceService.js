import API from '@utils/plugins/API';
import { orgClusterPathNamespace } from '@utils/helpers';

const NamespaceService = {
  all: (params) => {
    return API.get(`${orgClusterPathNamespace}`, { params });
  }
};

export default NamespaceService;
