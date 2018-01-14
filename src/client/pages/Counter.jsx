import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tick } from '../actions';
import { getCount } from '../selectors';

export const RawCounter = ({ count, tick }) => {
  return (
    <div>
      <p>{count}</p>
      <button onClick={tick}>Increment</button>
    </div>
  );
}
const mapStateToProps = (state) => {
  return ({
    count: getCount(state),
  });
}
const dispatchToActions = (dispatch) => {
  return {
    tick: () => dispatch(tick()),
  }
}

export default connect(mapStateToProps, dispatchToActions)(RawCounter)
