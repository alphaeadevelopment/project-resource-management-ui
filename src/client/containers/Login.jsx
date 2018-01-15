import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { getAuthErrorMessage } from '../selectors/index';

class RawLogin extends React.Component {
  constructor() {
    super();
    this.setUsername = this.setUsername.bind(this);
    this.state = {
      username: '',
    };
  }
  setUsername(e) {
    this.setState({ username: e.target.value });
  }
  render() {
    const { submitLogin, authErrorMessage } = this.props;
    return (
      <div>
        <h1>Login</h1>
        {authErrorMessage && <p>{authErrorMessage}</p>}
        <input type={'text'} value={this.state.username} onChange={this.setUsername} />
        <button onClick={() => submitLogin(this.state.username)}>Submit</button>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  authErrorMessage: getAuthErrorMessage(state),
});
const dispatchToActions = dispatch => ({
  submitLogin: name => dispatch(login(name)),
});

export default connect(mapStateToProps, dispatchToActions)(RawLogin);
