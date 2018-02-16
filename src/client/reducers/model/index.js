import { combineReducers } from 'redux';
import projects from './projects';
import budgets from './budgets';

export default combineReducers({
  projects, budgets,
});
