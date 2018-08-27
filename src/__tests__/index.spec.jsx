import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactAsyncComponet from '../index';

configure({ adapter: new Adapter() });

describe('unit test cases for react-asynchronous-component', () => {
  describe('unit test cases for basic props and default props', () => {
    let wrapper = null;
    let loader = null;
    let error = null;

    beforeEach(() => {
      loader = () => <p>loading...</p>;
      error = () => <p>loading...</p>;
      const props = {
        a: 'hi',
        b: 'hello',
      };
      wrapper = mount(
        <ReactAsyncComponet
          componentProps={props}
          loader={loader}
          error={error}
          load={import(/* webpackChunkName: "homefatchunk" */ '../../example/home')}
        />,
      );
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should run test engine', () => {
      expect(wrapper).toBeDefined();
    });
    it('should have props passed as componet props', () => {
      expect(wrapper.props().loader).toBeInstanceOf(Function);
      expect(wrapper.props().error).toBeInstanceOf(Function);
      expect(wrapper.props().load).toBeInstanceOf(Promise);
    });
    it('should handle default props', () => {
      wrapper = mount(
        <ReactAsyncComponet
          load={import(/* webpackChunkName: "homefatchunk" */ '../../example/home')}
        />,
      );
      expect(wrapper.props().loader).toBeInstanceOf(Function);
      expect(wrapper.props().error).toBeInstanceOf(Function);
      expect(wrapper.props().load).toBeInstanceOf(Promise);
    });
  });
  describe('unit test cases for dynamic import', () => {
    let wrapper = null;
    let loader = null;
    let error = null;

    beforeEach(() => {
      loader = () => <p>loading...</p>;
      error = () => <p>loading...</p>;
      const props = {
        a: 'hi',
        b: 'hello',
      };
      wrapper = mount(
        <ReactAsyncComponet
          componentProps={props}
          loader={loader}
          error={error}
          load={import(/* webpackChunkName: "homefatchunk" */ '../../example/home')}
        />,
      );
    });
    afterEach(() => {
      wrapper.unmount();
    });
  });
});
