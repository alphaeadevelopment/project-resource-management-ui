import React from 'react';

import packageJson from '../../../package.json';

export default () => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>{packageJson.description}</p>
    </div>
  );
}
