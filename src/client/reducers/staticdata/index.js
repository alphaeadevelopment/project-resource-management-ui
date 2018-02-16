import { combineReducers } from 'redux';
import roles from './roles';
import locations from './locations';
import resources from './resources';

export default combineReducers({
  roles,
  locations,
  resources,
});
