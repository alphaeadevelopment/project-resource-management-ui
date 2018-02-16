import update from 'immutability-helper';
import forEach from 'lodash/forEach';
import * as Types from '../../../actions/types';

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
  editing: null,
};
export default (state = initial, { type, payload }) => {
  switch (type) {
    case Types.BUDGETS_LOADED:
      return update(state, { all: { $merge: objectsById(payload.budgets) } });
    case Types.BUDGET_ADDED:
      return update(state, { all: { $merge: objectsById([payload.budget]) } });
    case Types.CURRENT_BUDGET_SELECTED:
      return update(state, { current: { $set: payload.budgetId } });
    case Types.START_EDIT_BUDGET:
      return update(state, { editing: { $set: payload.budget } });
    case Types.CANCEL_EDIT_BUDGET:
      return update(state, { editing: { $set: null } });
    case Types.SAVE_BUDGET:
      return update(state, {
        all: { $merge: objectsById([payload.budget]) },
        editing: { $set: null },
      });
    default:
      return state;
  }
};
