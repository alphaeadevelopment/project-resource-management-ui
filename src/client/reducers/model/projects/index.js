import update from 'immutability-helper';
import forEach from 'lodash/forEach';
import { PROJECTS_LOADED, SET_CURRENT_PROJECT } from '../../../actions/project/types';

const objectsById = (d) => {
  const rv = {};
  forEach(d, (o) => {
    const { id } = o;
    rv[id] = o;
  });
  return rv;
};

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
