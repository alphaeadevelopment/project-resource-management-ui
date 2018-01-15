import React from 'react';
import { Route } from 'react-router-dom';
import Paths from '../../paths';
import ProjectSummary from './ProjectSummary';
import ProjectList from './ProjectList';

export default class ProjectHome extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Route path={Paths.ProjectList} exact component={ProjectList} />
        <Route path={Paths.ProjectSummary} component={ProjectSummary} />
      </div>
    );
  }
}
