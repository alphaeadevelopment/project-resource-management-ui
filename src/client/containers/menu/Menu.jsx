import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ProjectList from './ProjectListMenuItem';
import LeftDrawer from './LeftDrawer';
import menuStyles from './menu-styles';

class RawMenuAppBar extends React.Component {
  state = {
    drawerOpen: false,
  };

  toggleDrawer = visible => () => {
    this.setState({ drawerOpen: visible });
  };


  render() {
    const { classes } = this.props;
    const { drawerOpen } = this.state;
    return (
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color='inherit'
            aria-label='Menu'
            onClick={this.toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.flexCtr}>
            <Typography variant='title' color='inherit'>Project Resource Management</Typography>
            <ProjectList>Projects</ProjectList>
          </div>
        </Toolbar>
        <LeftDrawer open={drawerOpen} toggleDrawer={this.toggleDrawer} />
      </AppBar>
    );
  }
}
export default withStyles(menuStyles)(RawMenuAppBar);
