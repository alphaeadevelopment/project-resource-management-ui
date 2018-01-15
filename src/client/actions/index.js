import { createAction } from 'redux-actions';
import { api } from '@alphaeadev/js-services';
import { TICK, LOGOUT, SUCCESSFUL_LOGIN, FAILED_LOGIN, PROJECTS_LOADED } from '../action-types';

export const tick = createAction(TICK);
export const successfulLogin = createAction(SUCCESSFUL_LOGIN);
export const failedLogin = createAction(FAILED_LOGIN);
export const projectsLoaded = createAction(PROJECTS_LOADED);

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
export const logout = createAction(LOGOUT);
export const loadProjects = () => (dispatch) => {
  api.get('/projects')
    .then((response) => {
      dispatch(projectsLoaded({ projects: response.projects }));
    });
};
