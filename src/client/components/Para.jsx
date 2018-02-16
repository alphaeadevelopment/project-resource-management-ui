import React from 'react';

import { Typography } from 'material-ui';

export default ({ children }) => (
  <Typography variant={'body1'}>
    {children}
  </Typography>
);
// variant enum: 'display4', 'display3', 'display2', 'display1', 'headline', 'title',
// 'subheading', 'body2', 'body1', 'caption', 'button'
