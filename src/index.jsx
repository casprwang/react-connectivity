import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { timer, from, of } from 'rxjs';
import { map, catchError, switchMapTo, timeout, pairwise } from 'rxjs/operators';
import isReachable from 'is-reachable';

import './index.css';


// cold
const getCheckReachable$ = (url, timeoutTime) => from(isReachable(url)).pipe(
  timeout(timeoutTime),
  catchError(() => of(false)),
);


// cold
const getConnectivity$ = (url, delayTime) => timer(0, delayTime).pipe(
  switchMapTo(getCheckReachable$(url, delayTime)),
  pairwise(),
  map(([last, curr]) => {
    if (!last && curr) return 'RC-reconnected';
    if (last && curr) return 'RC-connected';
    return 'RC-disconnected';
  }),
);


const Connectivity = ({ url = 'google.com', interval = 3000 }) => {
  const [msg, setMsg] = useState('');
  const [className, setClassName] = useState('RC-banner');

  const connectivity$ = getConnectivity$(url, interval);
  const observer = n => {
    if (n === 'RC-reconnected') {
      setClassName('RC-banner RC-banner-reconnect');
      setMsg('reconnected');
    } else if (n === 'RC-disconnected') {
      setClassName('RC-banner RC-banner-disconnect');
      setMsg('disconnected');
    } else {
      setClassName('RC-banner');
      setMsg('');
    }
  };

  useEffect(() => {
    const classNameSub = connectivity$.subscribe(observer);
    return () => {
      classNameSub.unsubscribe();
    };
  });

  return (
    <div className={className} data-conn={msg}></div>
  );
};


Connectivity.propTypes = {
  url: PropTypes.string,
  interval: PropTypes.number
};


export default Connectivity;
