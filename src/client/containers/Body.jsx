import React from 'react';
import { Route } from 'react-router-dom';
import { ProjectHome, Welcome, BudgetSummary } from '../pages';
import * as Paths from '../paths';
import Logout from './Logout';
import styles from './Body.scss';

export default () => {
  return (
    <div className={styles.body}>
      <Route path={Paths.Welcome} exact component={Welcome} />
      <Route path={Paths.ProjectHome} component={ProjectHome} />
      <Route path={Paths.BudgetSummary} component={BudgetSummary} />
      <Route path={Paths.Logout} component={Logout} />
    </div>
  );
};
