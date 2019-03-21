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
});