import { createAction } from 'redux-actions';
import { api } from '@alphaeadev/js-services';
import values from 'lodash/values';
import forEach from 'lodash/forEach';
import update from 'immutability-helper';
import * as Types from './types';

const budgetAdded = createAction(Types.BUDGET_ADDED);
export const currentBudgetSelected = createAction(Types.CURRENT_BUDGET_SELECTED);
export const budgetsLoaded = createAction(Types.BUDGETS_LOADED);
export const startEditBudget = createAction(Types.START_EDIT_BUDGET);
export const cancelEditBudget = createAction(Types.CANCEL_EDIT_BUDGET);
export const saveBudget = createAction(Types.SAVE_BUDGET);

const keyedById = (list) => {
  const rv = {};
  forEach(list, (l) => {
    const { id } = l;
    rv[id] = l;
  });
  return rv;
};

const toDbShape = budget => update(budget, { roles: { $apply: r => values(r || {}) } });
const fromDbShape = budget => update(budget, { roles: { $apply: r => keyedById(r) } });

export const addBudget = budget => (dispatch) => { // eslint-disable-line import/prefer-default-export
  api.post('/budgets/budgets', (toDbShape(budget)))
    .then((added) => {
      dispatch(budgetAdded({ budget: fromDbShape(added) }));
    })
    .catch(() => null);
};

export const setCurrentBudget = id => (dispatch) => {
  dispatch(currentBudgetSelected({ budgetId: id }));
};

export const loadBudget = (projectId, budgetId) => (dispatch) => {
  api.get(`/budgets/budgets/${projectId}/${budgetId}`)
    .then((response) => {
      dispatch(budgetsLoaded({ budgets: [fromDbShape(response)] }));
    })
    .catch(() => null);
};
export const loadProjectBudgets = projectId => (dispatch) => {
  api.get(`/budgets/budgets/project/${projectId}`)
    .then((response) => {
      dispatch(budgetsLoaded({ budgets: response.items.map(i => fromDbShape(i)) }));
    })
    .catch(() => null);
};

export const onStartEditBudget = budget => (dispatch) => {
  dispatch(startEditBudget({ budget }));
};
export const onCancelEditBudget = () => (dispatch) => {
  dispatch(cancelEditBudget());
};
export const onSaveBudget = budget => (dispatch) => {
  api.put(`/budgets/budgets/${budget.id}`, toDbShape(budget))
    .then((response) => {
      if (!response.isError) {
        dispatch(budgetsLoaded({ budgets: [budget] }));
        dispatch(cancelEditBudget());
      }
    })
    .catch(() => null);
};
