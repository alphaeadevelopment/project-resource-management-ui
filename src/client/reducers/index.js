import { combineReducers } from 'redux';
import model from './model';
import session from './session';
import { CONFIG_LOADED } from '../action-types';

const config = (state = {}, { type, payload }) => ((type === CONFIG_LOADED) ? payload : state);

export default combineReducers({
  model, session, config,
});
