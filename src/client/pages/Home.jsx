import React from 'react';

import Page from '../containers/Page';
import packageJson from '../../../package.json';

export default () => (
  <Page id={'home'}>
    <h1>Welcome</h1>
    <p>{packageJson.description}</p>
  </Page>
);
