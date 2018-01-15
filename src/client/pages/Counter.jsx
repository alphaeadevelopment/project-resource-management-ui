import React from 'react';
import { connect } from 'react-redux';
import { tick as doTick } from '../actions';
import { getCount } from '../selectors';

export const RawCounter = ({ count, tick }) => (
  <div>
    <p>{count}</p>
    <button onClick={tick}>Increment</button>
  </div>
);

const mapStateToProps = state => ({
  count: getCount(state),
});

const dispatchToActions = dispatch => ({
  tick: () => dispatch(doTick()),
});

export default connect(mapStateToProps, dispatchToActions)(RawCounter);
