import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import keys from 'lodash/keys';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { Manager, Target, Popper } from 'react-popper';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as Paths from '../../paths';
import menuStyles from './menu-styles';

class RawProjectList extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const { isLoggedIn, loadProjects } = this.props;
    if (isLoggedIn) {
      loadProjects();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isLoggedIn, loadProjects } = this.props;
    if (!isLoggedIn && nextProps.isLoggedIn) {
      loadProjects();
    }
  }
  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  selectProject = (p) => {
    const { history } = this.props;
    this.setState({ open: false });
    history.push(Paths.projectSummary(p));
  }


  render() {
    const { classes, children, projects } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.projectList}>
        <Manager>
          <Target>
            <Button
              aria-owns={open ? 'menu-list' : null}
              aria-haspopup='true'
              onClick={this.handleClick}
              color={'inherit'}
            >
              {children}
            </Button>
          </Target>
          <Popper
            placement='bottom-start'
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={open} id='menu-list' style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role='menu'>
                    {keys(projects).map((p) => {
                      const selectProject = () => this.selectProject(p);
                      return (
                        <MenuItem key={p} onClick={selectProject}>{projects[p].name}</MenuItem>
                      );
                    })}
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: Selectors.getProjects(state),
  isLoggedIn: Selectors.getIsLoggedIn(state),
});

const dispatchToActions = dispatch => ({
  loadProjects: () => dispatch(Actions.loadProjects()),
  setCurrentProject: id => dispatch(Actions.setCurrentProject(id)),
});

export default withRouter(connect(mapStateToProps, dispatchToActions)(withStyles(menuStyles)(RawProjectList)));
