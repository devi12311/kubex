import { ADD_PERMISSIONS, REMOVE_PERMISSIONS } from '@constants/redux';

export const addPermissions = (payload) => {
  return {
    type: ADD_PERMISSIONS,
    payload
  };
};

export const removePermissions = () => {
  return {
    type: REMOVE_PERMISSIONS
  };
};
