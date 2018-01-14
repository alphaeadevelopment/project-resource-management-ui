import React from 'react';
import { LabelledTextInput } from '@alphaeadev/common-ui-components';
import { number, api } from '@alphaeadev/js-services';

export default class TestIntegration extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    api.get('/users').then((data) => console.log(data));
  }
  render() {
    return (
      <div>
        <LabelledTextInput text={number.round(1.234567, 3)}></LabelledTextInput>
      </div>
    );
  }
}
