import React from 'react';
import { connect } from 'react-redux';
import { api } from '@alphaeadev/js-services';
import { keepSessionAlive } from '../actions';

export class RawPage extends React.Component {
  componentDidMount() {
    this.props.keepAlive();
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

const mapStateToProps = () => ({
});

const dispatchToActions = dispatch => ({
  keepAlive: () => dispatch(keepSessionAlive()),
});

export default connect(mapStateToProps, dispatchToActions)(RawPage);
