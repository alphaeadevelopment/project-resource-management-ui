import { createAction } from 'redux-actions';
import { api } from '@alphaeadev/js-services';
import {
  TICK, LOGOUT, SUCCESSFUL_LOGIN, FAILED_LOGIN, PROJECTS_LOADED,
  SET_CURRENT_PROJECT,
} from '../action-types';

export const tick = createAction(TICK);
export const successfulLogin = createAction(SUCCESSFUL_LOGIN);
export const failedLogin = createAction(FAILED_LOGIN);
export const projectsLoaded = createAction(PROJECTS_LOADED);
export const setCurrentProject = createAction(SET_CURRENT_PROJECT);
export const logout = createAction(LOGOUT);

export const keepSessionAlive = () => () => {
  api.post('/keep-alive')
    .then(() => null)
    .catch((err) => {
      console.error('Failed to keep session alive:', err); // eslint-disable-line no-console
    });
};

export const validateLoginSession = () => (dispatch) => {
  api.get('/validate-session')
    .then((response) => {
      if (response.statusCode !== 200) {
        dispatch(failedLogin({ message: response.message }));
      }
    })
    .catch(() => {
      dispatch(createAction(FAILED_LOGIN));
    });
};
export const login = username => (dispatch) => {
  api.post('/login', { username })
    .then((response) => {
      if (response.statusCode === 200) {
        dispatch(successfulLogin({ username }));
      }
      else if (response.statusCode === 403) {
        dispatch(failedLogin({ message: response.message }));
      }
    })
    .catch(() => {
      dispatch(createAction(FAILED_LOGIN));
    });
};
export const loadProjects = () => (dispatch) => {
  api.get('/projects')
    .then((response) => {
      dispatch(projectsLoaded({ projects: response.projects }));
    });
};
