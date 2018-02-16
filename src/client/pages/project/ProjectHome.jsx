import React from 'react';
import { Route } from 'react-router-dom';
import * as Paths from '../../paths';
import ProjectSummary from './ProjectSummary';

export default class ProjectHome extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Route path={Paths.ProjectSummary} exact component={ProjectSummary} />
      </div>
    );
  }
}
