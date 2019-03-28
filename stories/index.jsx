import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Connectivity from '../src/index.jsx';

import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

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



storiesOf('grid', module)
  .add('with basic grid layout', () => {
    let layout = [
      {i: 'a', x: 0, y: 0, w: 6, h: 4, static: true},
      {i: 'b', x: 3, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 0, y: 2, w: 5, h: 2},
      {i: 'd', x: 0, y: 0, w: 5, h: 2}
    ];

    const endpoints = [
      'google.com',
      'localhost',
      'non-existing-endpoint.com',
      '8.8.8.8'
    ];

    layout.map((e, i) => {
      e.i = endpoints[i]
      return e
    })

    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={800} compactType="horizontal">
        {layout.map((e) => 
          <div key={e.i}>
            <Connectivity url={e.i}></Connectivity>
            <span className="text">{e.i}</span>
          </div>)
        }
      </GridLayout>
    );
  });
