import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { getAuthErrorMessage } from '../selectors/index';

class RawLogin extends React.Component {
  constructor() {
    super();
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.state = {
      username: '',
      password: '',
    };
  }
  onClickLogin() {
    this.props.submitLogin(this.state.username, this.state.password);
  }
  setUsername(e) {
    this.setState({ username: e.target.value });
  }
  setPassword(e) {
    this.setState({ password: e.target.value });
  }
  render() {
    const { authErrorMessage } = this.props;
    return (
      <div>
        <h1>Login</h1>
        {authErrorMessage && <p>{authErrorMessage}</p>}
        <input type={'text'} value={this.state.username} onChange={this.setUsername} />
        <input type={'password'} value={this.state.password} onChange={this.setPassword} />
        <button onClick={this.onClickLogin}>Submit</button>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  authErrorMessage: getAuthErrorMessage(state),
});
const dispatchToActions = dispatch => ({
  submitLogin: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, dispatchToActions)(RawLogin);
