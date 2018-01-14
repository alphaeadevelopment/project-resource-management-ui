import React from 'react';
import { Route } from 'react-router-dom';
import { Counter, Welcome, TestIntegration } from '../pages';
import Paths from '../paths';

export default () => (
  <div id={'body-wrapper'}>
    <Route exact path={Paths.Home} component={Welcome} />
    <Route path={Paths.Counter} component={Counter} />
    <Route path={Paths.TestIntegration} component={TestIntegration} />
  </div>
);
