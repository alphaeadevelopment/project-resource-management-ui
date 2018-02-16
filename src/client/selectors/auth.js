import { createSelector } from 'reselect';

export const getIsLoggedInFromState = state => state.session.isLoggedIn;
export const getAuthErrorMessageFromState = state => state.session.errorMessage;
export const getAuthTokenFromState = state => state.session.token;

export const getIsLoggedIn = createSelector(
  [getIsLoggedInFromState],
  (isLoggedIn) => {
    return isLoggedIn;
  },
);

export const getAuthErrorMessage = createSelector(
  [getAuthErrorMessageFromState],
  m => m,
);

export const getAuthToken = createSelector(
  [getAuthTokenFromState],
  t => t,
);
