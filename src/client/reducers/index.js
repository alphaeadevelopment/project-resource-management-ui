import { combineReducers } from 'redux';
import model from './model';
import session from './session';

export default combineReducers({
  model, session,
});
