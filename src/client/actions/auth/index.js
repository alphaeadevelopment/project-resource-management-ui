import { createAction } from 'redux-actions';
import { window, api } from '@alphaeadev/js-services';
import { hashPassword } from '../../crypto';

import {
  LOGOUT, SUCCESSFUL_LOGIN, FAILED_LOGIN,
  SESSION_VALIDATED, SESSION_REFRESHED,
} from '../../action-types';

export const successfulLogin = createAction(SUCCESSFUL_LOGIN);
export const sessionValidated = createAction(SESSION_VALIDATED);
export const sessionRefreshed = createAction(SESSION_REFRESHED);
export const failedLogin = createAction(FAILED_LOGIN);
export const logoutAction = createAction(LOGOUT);

const TOKEN_STORAGE_KEY = 'token';
const storeToken = (token) => {
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
};
const removeToken = () => {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
};
export const keepSessionAlive = token => (dispatch) => {
  api.post('/auth/keep-alive', { token })
    .then(res => dispatch(sessionRefreshed({ token: res.token })))
    .catch((err) => {
      console.error('Failed to keep session alive:', err); // eslint-disable-line no-console
    });
};

export const logout = () => (dispatch) => {
  removeToken();
  dispatch(logoutAction());
};

export const validateLoginSession = token => (dispatch) => {
  api.post('/auth/validate-session', { token })
    .then((response) => {
      if (response.statusCode !== 200) {
        removeToken();
        dispatch(failedLogin({ message: response.message }));
      }
      else {
        dispatch(sessionValidated(response));
      }
    })
    .catch((err) => {
      removeToken();
      dispatch(failedLogin({ err }));
    });
};

export const login = (username, password) => (dispatch) => {
  api.post('/auth/login', { username, ...hashPassword(username, password) })
    .then((response) => {
      if (response.statusCode === 200) {
        storeToken(response.token);
        dispatch(successfulLogin(response));
      }
      else if (response.statusCode === 403) {
        removeToken();
        dispatch(failedLogin({ message: response.message }));
      }
    })
    .catch((err) => {
      removeToken();
      dispatch(failedLogin(err));
    });
};
