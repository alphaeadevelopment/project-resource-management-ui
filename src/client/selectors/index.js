import { createSelector } from 'reselect';

export const getIsLoggedInFromState = state => state.session.isLoggedIn;
export const getAuthErrorMessageFromState = state => state.session.errorMessage;
export const getCountFromState = state => state.model.count;
export const getProjectsFromState = state => state.model.project.all;

export const getCount = createSelector(
  [getCountFromState],
  count => count,
);

export const getIsLoggedIn = createSelector(
  [getIsLoggedInFromState],
  isLoggedIn => isLoggedIn,
);

export const getAuthErrorMessage = createSelector(
  [getAuthErrorMessageFromState],
  m => m,
);

export const getProjects = createSelector(
  [getProjectsFromState],
  p => p,
);
