import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { timer, from, of } from 'rxjs';
import { map, catchError, switchMap, timeout, pairwise } from 'rxjs/operators';
import isReachable from 'is-reachable';


import './index.css';


const timer$ = timer(0, 3000);
const getCheckReachable$ = url => from(isReachable(url)).pipe(
  timeout(2500),
  catchError(() => of(false)),
);

const poll$ = timer$.pipe(
  switchMap(() => getCheckReachable$('google.com')),
);

const classNameMapper = ([last, curr]) => {
  if (!last && curr) return 'reconnected';
  if (last && curr) return 'connected';
  return 'disconnected';
};

export const connectivity$ = poll$.pipe(
  pairwise(),
  map(classNameMapper),
);

const Main = ({ children }) => {
  const [msg, setMsg] = useState('');
  const [className, setClassName] = useState('banner');

  const observer = n => {
    if (n === 'reconnected') {
      setClassName('banner banner-reconnect');
      setMsg('reconnected');
    }
    else if (n === 'disconnected') {
      setClassName('banner banner-disconnect');
      setMsg('disconnected');
    } else {
      setClassName('banner');
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
    <>
      <div className={className} data-conn={msg}></div>
      {children}
    </>
  );
};


Main.propTypes = {
  children: PropTypes.element
};


export default Main;
