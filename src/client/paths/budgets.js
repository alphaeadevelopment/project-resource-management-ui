
export const BudgetSummary = '/budgets/:projectId/:budgetId';
export const budgetSummary = (projectId, budgetId) =>
  BudgetSummary.replace(/:projectId/, projectId).replace(/:budgetId/, budgetId);
