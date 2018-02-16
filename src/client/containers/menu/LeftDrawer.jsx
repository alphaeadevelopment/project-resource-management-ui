import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';

import menuStyles from './menu-styles';

export default withStyles(menuStyles)(({ open, toggleDrawer, classes }) => (
  <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
    <div
      tabIndex={0}
      role='button'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={classes.drawerList}
    >
      <List subheader={<ListSubheader component='div'>Static Data</ListSubheader>}>
        <ListItem button><ListItemText primary={'Roles'} /></ListItem>
        <ListItem button><ListItemText primary={'Countries'} /></ListItem>
        <ListItem button><ListItemText primary={'Rates'} /></ListItem>
      </List>
    </div>
  </Drawer>
));
