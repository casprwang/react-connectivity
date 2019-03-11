import React, { useEffect, useState } from 'react';
import { timer, from } from 'rxjs';
import { map, catchError, switchMap, timeout, pairwise } from 'rxjs/operators';
import isReachable from 'is-reachable'

import './index.css';


const timer$ = timer(0, 3000)
const getCheckReachable$ = url => from(isReachable(url)).pipe(
  timeout(2500),
  catchError(() => of(false)),
)

const poll$ = timer$.pipe(
  switchMap(() => getCheckReachable$('google.com')),
)

const classNameMapper = ([last, curr]) => {
  if (!last && curr) return 'banner banner-reconnect'
  if (last && curr) return 'banner'
  return 'banner banner-disconnect'
}

const className$ = poll$.pipe(
  pairwise(),
  map(classNameMapper),
)

export default ({ children }) => {
  const [msg, setMsg] = useState('')
  const [className, setClassName] = useState('banner')

  const observer = n => {
    setClassName(n)
    if (n === 'banner banner-reconnect') setMsg('reconnected')
    else if (n === 'banner banner-disconnect') setMsg('disconnected')
    else setMsg('')
  }

  useEffect(() => {
    const classNameSub = className$.subscribe(observer)
    return () => {
      classNameSub.unsubscribe()
    }
  })

  return (
    <>
      <div className={className} data-conn={msg}></div>
      {children}
    </>
  )
}
