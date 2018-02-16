import { createSelector } from 'reselect';

export const getAllBudgetsFromState = state => state.model.budgets.all;
export const getCurrentBudgetId = state => state.model.budgets.current;
export const getEditingBudget = state => state.model.budgets.editing;

export const getCurrentBudget = createSelector(
  [getCurrentBudgetId, getAllBudgetsFromState],
  (currentBudgetId, allBudgets) => {
    const budget = allBudgets[currentBudgetId];
    return budget;
  },
);
