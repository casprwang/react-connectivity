# react-connectivity

[![Build Status](https://travis-ci.com/wangsongiam/react-connectivity.svg?token=YfFsXUqpWyjibv8mNnVs&branch=master)](https://travis-ci.com/wangsongiam/react-connectivity)
[![npm version](http://img.shields.io/npm/v/react-connectivity.svg?style=flat)](https://npmjs.org/package/react-connectivity "View this project on npm")

A react component wrapper for connection checks.


## Motivation

I wanted to build a system monitoring interface with multiple panes from different endpoints.
From which I need indicators for connection failures and reconnections.


## Installation and Usage

```
yarn add react-connectivity
```

```js
import Connectivity from 'react-connectivity'

<div className="your wrapper">
  <Connectivity url="your endpoint" interval=3000 />
  ...
</div>
```

## Design

open for discussion.

### Pattern?

Observable pattern polling; hooks for component side effects.

### Styling?

Currently using plain CSS, plan to migrate to CSS-in-JS for exposing more sytling apis.


### Testing?

Basic unit test for component, plan to test Observables.

## Caveats

* With default timeout by 3 seconds, slower-than-3G network might be treated as disconnected.


## Related
* [HubSpot/offline](https://github.com/hubspot/offline)
* [sindresorhus/is-reachable](https://github.com/sindresorhus/is-reachable)
