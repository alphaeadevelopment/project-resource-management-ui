import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoggedIn } from '../selectors';
import { validateLoginSession } from '../actions';
import Login from './Login';
import PostLogin from './PostLogin';

const INITIAL_PAGE = '/home';

export const RawApp = ({ isLoggedIn, history, validateSession }) => {
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
    <PostLogin validateSession={validateSession} />
  );
};

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const dispatchToActions = dispatch => ({
  validateSession: () => dispatch(validateLoginSession()),
});

export default withRouter(connect(mapStateToProps, dispatchToActions)(RawApp));
