import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tick } from '../actions';
import { getCount } from '../selectors';
import Menu from './Menu';
import Body from './Body';
import testNpmModule from '@alphaeadev/test-npm-module';
import testEs6NpmModule from '@alphaeadev/test-es6-npm-module';

export default ({ count, tick }) => {
  testNpmModule();
  testEs6NpmModule();
  return (
    <div>
      <Menu />
      <Body />
    </div>
  );
}
