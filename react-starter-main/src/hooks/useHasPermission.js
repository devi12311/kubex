import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useHasPermission = (requestedPermission) => {
  const [hasAccess, setHasAccess] = useState(false);

  // eslint-disable-next-line no-undef
  const permissions = useSelector((state) => _.get(state, 'permissionsReducer.permissions', []));

  useEffect(() => {
    setHasAccess(requestedPermission && permissions?.includes(requestedPermission));
  }, [permissions, requestedPermission]);

  return hasAccess;
};

export default useHasPermission;
