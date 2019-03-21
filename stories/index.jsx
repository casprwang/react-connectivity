import React from 'react';
import { storiesOf } from '@storybook/react';

import Connectivity from '../src/index.jsx';

import './index.css';


storiesOf('Basic', module)
  .add('with basic wrapper', () => (
    <div className="wrapper-basic">
      <Connectivity />
      <h1>I am wrapped with react-connectivity, try go offline</h1>
    </div>
  ))
  .add('with large wrapper', () => (
    <div className="wrapper-large">
      <Connectivity />
      <h1>I am wrapped with react-connectivity, try go offline</h1>
    </div>
  ))
  .add('with small wrapper', () => (
    <div className="wrapper-small">
      <Connectivity />
      <h1>I am wrapped with react-connectivity, try go offline</h1>
    </div>
  ));



storiesOf('offline', module)
  .add('with basic wrapper', () => (
    <div className="wrapper-basic">
      <Connectivity url="jsdlkfjsldkjfsdf.com" />
      <h1>I am pointing to a unconnectable endpoint</h1>
    </div>
  ));
