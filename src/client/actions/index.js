import { createAction } from 'redux-actions';

import { api } from '@alphaeadev/js-services';
import {
  PROJECTS_LOADED,
  SET_CURRENT_PROJECT,
  CONFIG_LOADED,
} from '../action-types';

export const projectsLoaded = createAction(PROJECTS_LOADED);
export const setCurrentProject = createAction(SET_CURRENT_PROJECT);
export const configLoaded = createAction(CONFIG_LOADED);

export * from './auth';

export const loadProjects = () => (dispatch) => {
  api.get('/projects')
    .then((response) => {
      dispatch(projectsLoaded({ projects: response.projects }));
    });
};
