import React from 'react';

import Menu from './Menu';
import Body from './Body';

const INTERVAL = 3000;

export default class PostLogin extends React.Component {
  componentDidMount() {
    this.sessionPoller = setInterval(this.validateSession.bind(this), INTERVAL);
  }

  componentWillUnmount() {
    if (this.sessionPoller) {
      clearInterval(this.sessionPoller);
    }
  }

  validateSession() {
    this.props.validateSession();
  }

  render() {
    return (
      <div>
        <Menu />
        <Body />
      </div>
    );
  }
}
