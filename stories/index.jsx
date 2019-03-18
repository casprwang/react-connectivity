import React from 'react';
import { storiesOf } from '@storybook/react';

import Connectivity from '../src/index.jsx';

import './index.css'


storiesOf('Button', module)
  .add('with text', () => (
    <div className="wrapper">
      <Connectivity>
        <h1>Hello</h1>
      </Connectivity>
    </div>
  ))
