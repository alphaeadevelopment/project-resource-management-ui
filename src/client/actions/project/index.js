import { createAction } from 'redux-actions';
import { api } from '@alphaeadev/js-services';
import {
  PROJECTS_LOADED,
  SET_CURRENT_PROJECT,
} from './types';

export const projectsLoaded = createAction(PROJECTS_LOADED);
export const setCurrentProjectId = createAction(SET_CURRENT_PROJECT);


export const loadProjects = () => (dispatch) => {
  api.get('/prj/projects')
    .then((response) => {
      dispatch(projectsLoaded({ projects: response.items }));
    })
    .catch(() => null);
};

export const setCurrentProject = id => (dispatch) => {
  dispatch(setCurrentProjectId(id));
  // dispatch(loadProjectBudgets(id));
};
