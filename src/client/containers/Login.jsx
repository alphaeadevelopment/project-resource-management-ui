/* eslint-disable import/no-unresolved,import/no-extraneous-dependencies */
import React from 'react';
import image from 'images/kaitlyn-baker-422999.jpg';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import credit from 'images/kaitlyn-baker-422999.credit.json';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { login } from '../actions';
import { getAuthErrorMessage } from '../selectors/index';
import loginStyles from './login-styles';

const LinkedText = ({ link, children }) => (
  (link) ? (<a target={'_new'} href={link}>{children}</a>) : children
);

const PhotoCredit = withStyles(loginStyles)(({ details, classes }) => {
  const { author, siteName, siteUrl, authorUrl } = details;
  return (
    <div className={classes.photoCredit}>
      <p>Photo by <LinkedText link={authorUrl}><span className={classes.author}>{author}</span></LinkedText>
        {siteName && <span> on <LinkedText link={siteUrl}>{siteName}</LinkedText></span>}
      </p>
    </div>
  );
});

class RawLogin extends React.Component {
  state = {
    username: '',
    password: '',
  }
  onChange = field => (e) => {
    this.setState({ [field]: e.target.value });
  }
  onSubmit = () => {
    const { submitLogin } = this.props;
    const { username, password } = this.state;
    submitLogin(username, password);
  }
  onClickLogin = () => {
    const { username, password } = this.state;
    this.props.submitLogin(username, password);
  }
  render() {
    const { username, password } = this.state;
    const { authErrorMessage, classes } = this.props;
    const backgroundStyle = {
      backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.8)), url(${image})`,
    };

    return (
      <div className={classNames(this.props.className, classes.loginBackdrop)} style={backgroundStyle}>
        <div className={classes.login}>
          {authErrorMessage && <p className={classes.errorMessage}>{authErrorMessage}</p>}
          <form noValidate autoComplete='off'>
            <div className={classes.loginForm}>
              <TextField
                labelClassName={classes.field}
                className={classes.field}
                id='username'
                label='Username'
                type={'text'}
                value={username}
                onChange={this.onChange('username')}
                margin={'normal'}
              />
              <TextField
                labelClassName={classes.field}
                className={classes.field}
                id='password'
                type={'password'}
                label='Password'
                value={password}
                onChange={this.onChange('password')}
                margin={'normal'}
              />
            </div>
            <Button className={classes.loginButton} variant={'raised'} onClick={this.onClickLogin}>Login</Button>
          </form>
        </div>
        <PhotoCredit details={credit} />

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

export default connect(mapStateToProps, dispatchToActions)(withStyles(loginStyles)(RawLogin));
