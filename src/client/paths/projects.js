export const ProjectList = '/projects/list';
export const ProjectHome = '/projects';
export const ProjectSummary = '/projects/:id';
export const projectSummary = id => ProjectSummary.replace(/:id/, id);
