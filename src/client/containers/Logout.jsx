import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../actions';
import Paths from '../paths';

class RawLogout extends React.Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return (
      <div>
        <Redirect to={Paths.Welcome} />
      </div>
    );
  }
}


const mapStateToProps = () => ({
});

const dispatchToActions = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, dispatchToActions)(RawLogout);
