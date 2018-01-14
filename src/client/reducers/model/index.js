import { TICK } from '../../action-types';
import update from 'immutability-helper';

const initial = {
  count: 0,
}
export default (state = initial, { type, payload }) => {
  switch (type) {
    case TICK:
      return update(state, { count: { $apply: (c) => c + 1 } })
    default:
      return state;
  }
}
