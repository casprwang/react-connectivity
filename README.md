# react-connectivity

[![npm version](http://img.shields.io/npm/v/react-connectivity.svg?style=flat)](https://npmjs.org/package/react-connectivity "View this project on npm")

A react component wrapper for connection checks.


## Motivation

I wanted to build a system monitoring interface with multiple panes from different endpoints.
From which I need indicators for connection failures and reconnections.


## Installation and Usage

```
yarn add react-connectivity
```

## Design

open for discussion.

### Pattern?

For polling, I chose Observable pattern for mainly three reasons: tired of mutating states; testing; a desire to play more Observables.

For component logics, I used hooks. It looks simpler.

### Styling?

Currently using plain CSS, while it might be better to use CSS-in-JS for exposing more sytling apis.


### Testing?

Just unit tests for Observables.


## Caveats

* With default 3s Slow 3G network might be treated as 


## Related
* [HubSpot/offline](https://github.com/hubspot/offline)
* [sindresorhus/is-reachable](https://github.com/sindresorhus/is-reachable)
