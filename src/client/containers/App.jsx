import React from 'react';
import { withRouter } from 'react-router-dom';
import 'styles/main.scss'; // eslint-disable-line import/no-unresolved,import/no-extraneous-dependencies
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { getIsLoggedIn, getAuthToken } from '../selectors';
import { validateLoginSession } from '../actions';
import Login from './Login';
import PostLogin from './PostLogin';
import styles from './App.scss';
import * as Paths from '../paths';

const INITIAL_PAGE = Paths.Welcome;

const theme = createMuiTheme();

export class RawApp extends React.Component {
  constructor(props) {
    super(props);
    this.validateSession = this.validateSession.bind(this);
  }
  componentDidMount() {
    const { token, isLoggedIn, history } = this.props;
    if (!isLoggedIn) {
      if (token) this.validateSession();
      else if (history.location.pathname !== INITIAL_PAGE) {
        history.push(INITIAL_PAGE);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const { isLoggedIn, history } = this.props;
    const { pathname } = history.location;
    if (!isLoggedIn && nextProps.isLoggedIn && pathname === '/') {
      history.push(INITIAL_PAGE);
    }
    if (isLoggedIn && !nextProps.isLoggedIn && pathname !== '/') {
      history.push('/');
    }
  }
  validateSession() {
    this.props.validateSession(this.props.token);
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.app}>
          {!isLoggedIn && <Login className={styles.appContainer} />}
          {isLoggedIn && <PostLogin className={styles.appContainer} validateSession={this.validateSession} />}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  token: getAuthToken(state),
});

const dispatchToActions = dispatch => ({
  validateSession: token => dispatch(validateLoginSession(token)),
});

export default withRouter(connect(mapStateToProps, dispatchToActions)(RawApp));
