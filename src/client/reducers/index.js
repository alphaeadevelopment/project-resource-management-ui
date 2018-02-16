import { combineReducers } from 'redux';
import model from './model';
import session from './session';
import staticdata from './staticdata';

export default combineReducers({
  model, session, staticdata,
});
