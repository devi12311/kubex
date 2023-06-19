import { ADD_ROLES, REMOVE_ROLES } from '@constants/redux';

const rolesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ROLES:
      return [...action.payload];
    case REMOVE_ROLES:
      return [];
    default:
      return state;
  }
};

export default rolesReducer;
