import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withConfig } from '@alphaeadev/config-client';
import { getIsLoggedIn, getAuthToken } from '../selectors';
import { validateLoginSession } from '../actions';
import Login from './Login';
import PostLogin from './PostLogin';

const INITIAL_PAGE = '/home';

export class RawApp extends React.Component {
  constructor(props) {
    super(props);
    this.validateSession = this.validateSession.bind(this);
  }
  componentDidMount() {
    const { token, isLoggedIn } = this.props;
    if (!isLoggedIn && token) {
      this.validateSession();
    }
  }
  validateSession() {
    this.props.validateSession(this.props.token);
  }
  render() {
    const { isLoggedIn, history } = this.props;
    if (!isLoggedIn) {
      if (history.location.pathname !== INITIAL_PAGE) {
        history.push(INITIAL_PAGE);
        return null;
      }
      return (
        <Login />
      );
    }
    return (
      <PostLogin validateSession={this.validateSession} />
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

export default withConfig(
  withRouter(connect(mapStateToProps, dispatchToActions)(RawApp)))('project-resource-management-ui');
