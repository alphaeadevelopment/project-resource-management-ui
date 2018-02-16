import React from 'react';
import { withStyles } from 'material-ui/styles';
import Cached from 'material-ui-icons/Cached';
import Card from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import classNames from 'classnames';

const styles = theme => ({
  ctr: {
    padding: theme.spacing.unit * 2,
  },
  iconCtr: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});
const RawRemoteData = ({ classes, className, children, onRefresh }) => {
  return (
    <Card className={classNames(classes.ctr, className)}>
      {onRefresh &&
        <div className={classes.iconCtr}>
          <IconButton
            onClick={() => onRefresh()}
            color='inherit'
          >
            <Cached />
          </IconButton>
        </div>
      }
      <div>
        {children}
      </div>
    </Card>
  );
};

export default withStyles(styles)(RawRemoteData);
