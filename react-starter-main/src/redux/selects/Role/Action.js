import { ADD_ROLES, REMOVE_ROLES } from '@constants/redux';

export const addRoles = (payload) => {
  return {
    type: ADD_ROLES,
    payload
  };
};

export const removeRoles = () => {
  return {
    type: REMOVE_ROLES
  };
};
