import React from 'react';

import Page from '../containers/Page';
import packageJson from '../../../package.json';
import styles from './Welcome.scss';
import { Title, Para } from '../components';

export default () => (
  <Page id={'home'} className={styles.welcome}>
    <Title>Welcome</Title>
    <Para>{packageJson.description}</Para>
  </Page>
);
