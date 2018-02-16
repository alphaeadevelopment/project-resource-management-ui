import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import values from 'lodash/values';

import * as Budget from './budget';

export const getAllProjectsFromState = state => state.model.projects.all;
export const getCurrentProjectId = state => state.model.projects.current;

export const getProjects = createSelector(
  [getAllProjectsFromState],
  p => p,
);

export const getCurrentProject = createSelector(
  [getCurrentProjectId, getAllProjectsFromState, Budget.getAllBudgetsFromState],
  (currentProjectId, allProjects, allBudgets) => {
    const project = allProjects[currentProjectId];
    if (!project) return null;
    const budgets = filter(values(allBudgets), b => b.projectId === currentProjectId);
    return {
      ...project,
      budgets: budgets.length === 0 ? null : budgets,
    };
  },
);
