import update from 'immutability-helper';
import { PROJECTS_LOADED } from '../../../action-types';

const objectsById = d => d;

const initial = {
  all: {},
};
export default (state = initial, { type, payload }) => {
  switch (type) {
    case PROJECTS_LOADED:
      return update(state, { all: { $set: objectsById(payload.projects) } });
    default:
      return state;
  }
};
