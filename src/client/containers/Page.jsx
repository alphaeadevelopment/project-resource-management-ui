import React from 'react';
import { connect } from 'react-redux';
import { api } from '@alphaeadev/js-services';
import { getAuthToken } from '../selectors';
import { keepSessionAlive } from '../actions';

export class RawPage extends React.Component {
  componentDidMount() {
    this.props.keepAlive(this.props.token);
    api.post('/analytics/page/enter', { id: this.props.id, timestamp: new Date().getTime() });
  }
  componentWillUnmount() {
    api.post('/analytics/page/exit', { id: this.props.id, timestamp: new Date().getTime() });
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: getAuthToken(state),
});

const dispatchToActions = dispatch => ({
  keepAlive: token => dispatch(keepSessionAlive(token)),
});

export default connect(mapStateToProps, dispatchToActions)(RawPage);
