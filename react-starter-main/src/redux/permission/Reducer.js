import { ADD_PERMISSIONS, REMOVE_PERMISSIONS } from '@constants/redux';

const permissionsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PERMISSIONS:
      return { ...state, permissions: [...action.payload] };
    case REMOVE_PERMISSIONS:
      return {};
    default:
      return state;
  }
};

export default permissionsReducer;
