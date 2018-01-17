import { createAction } from 'redux-actions';

import { api } from '@alphaeadev/js-services';
import {
  PROJECTS_LOADED,
  SET_CURRENT_PROJECT,
} from '../action-types';

export const projectsLoaded = createAction(PROJECTS_LOADED);
export const setCurrentProject = createAction(SET_CURRENT_PROJECT);

export * from './auth';

export const loadProjects = () => (dispatch) => {
  api.get('/projects')
    .then((response) => {
      dispatch(projectsLoaded({ projects: response.projects }));
    });
};
