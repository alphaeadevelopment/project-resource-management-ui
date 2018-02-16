import React from 'react';
import { withStyles } from 'material-ui/styles';
import buttonBarStyles from './button-bar-styles';

export default withStyles(buttonBarStyles)(({ classes, children }) => (
  <div className={classes.buttonBar}>
    {children}
  </div>
));
