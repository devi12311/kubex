import { combineReducers } from 'redux';
import permissionsReducer from '@redux/permission/Reducer';
import rolesReducer from '@redux/selects/Role/Reducer';
import spinnerReducer from './spinner/Reducer';
import meReducer from './me/Reducer';
import authenticationReducer from './authentication/Reducer';

const Reducers = combineReducers({
  authenticationReducer,
  meReducer,
  spinnerReducer,
  permissionsReducer,
  rolesReducer
});

export default Reducers;
