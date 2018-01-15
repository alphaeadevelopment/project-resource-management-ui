import React from 'react';
import { Route } from 'react-router-dom';
import { ProjectHome, Home } from '../pages';
import Paths from '../paths';
import Logout from './Logout';

export default () => (
  <div id={'body-wrapper'}>
    <Route path={Paths.Home} exact component={Home} />
    <Route path={Paths.ProjectHome} component={ProjectHome} />
    <Route path={Paths.Logout} component={Logout} />
  </div>
);
