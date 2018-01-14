/* globals describe, it */
import React from 'react'
import chai, { expect } from 'chai'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const injectCounter = require('inject-loader!./App')

const testSpy = sinon.spy()
const App = injectCounter({
  '@alphaeadev/test-npm-module': testSpy,
}).default;

chai.use(chaiEnzyme()) // Note the invocation at the end
chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() })

describe('<App />', () => {
  it('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).to.exist;
    expect(testSpy).to.have.been.called;
  })
})
