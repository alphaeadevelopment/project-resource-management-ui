import update from 'immutability-helper';
import { PROJECTS_LOADED, SET_CURRENT_PROJECT } from '../../../action-types';

const objectsById = d => d;

const initial = {
  all: {},
  current: null,
};
export default (state = initial, { type, payload }) => {
  switch (type) {
    case PROJECTS_LOADED:
      return update(state, { all: { $set: objectsById(payload.projects) } });
    case SET_CURRENT_PROJECT:
      return update(state, { current: { $set: payload } });
    default:
      return state;
  }
};
