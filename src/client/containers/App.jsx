import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoggedIn } from '../selectors';
import Menu from './Menu';
import Body from './Body';
import Login from './Login';

const PostLogin = () => (
  <div>
    <Menu />
    <Body />
  </div>
);

// export default ({ isLoggedIn }) => {
export const RawApp = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return (
      <Login />
    );
  }
  return (
    <div>
      <PostLogin isLoggedIn={isLoggedIn} />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

export default withRouter(connect(mapStateToProps)(RawApp));
