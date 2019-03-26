// setup file
import React from 'react';
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Connectivity from '../src/index.jsx';

configure({ adapter: new Adapter() });


describe('tes online', () => {
  test('should hide online', () => {
    expect(mount(<Connectivity />).find('.banner').length).toBe(1);
  });
  test('should render', () => {
    expect(mount(<Connectivity />).find('.banner .banner-disconnect').length).toBe(0);
  });
  test('should url props render', () => {
    expect(mount(<Connectivity url="test-endpoint" />).find('.banner .banner-disconnect').length).toBe(0);
  });
  test('should interval render', () => {
    expect(mount(<Connectivity url="test-endpoint" interval={1000} />).find('.banner .banner-disconnect').length).toBe(0);
  });
});
