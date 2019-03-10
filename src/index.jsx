import React, { useEffect, useState } from 'react';
import { timer, from, merge } from 'rxjs';
import { map, delay, mapTo, filter, distinctUntilChanged, catchError, switchMap, timeout, pairwise } from 'rxjs/operators';
import isReachable from 'is-reachable'

import './index.css';


const timer$ = timer(0, 3000)
const getCheckReachable$ = url => from(isReachable(url)).pipe(
  timeout(2500),
  catchError(() => false),
)

const ping$ = timer$.pipe(
  switchMap(() => getCheckReachable$('google.com')),
)
const pingLazy$ = ping$.pipe(
  distinctUntilChanged()
)

const falseToTrueFilterer = ([last, curr]) => {
  if (!last && curr) return true
  return false
}

const reconnect$ = pingLazy$.pipe(
  pairwise(),
  filter(falseToTrueFilterer),
)

const hideAfterDelay$ = reconnect$.pipe(
  delay(1000),
)

const failedPing$ = ping$.pipe(
  filter(x => !x)
)

const className$ = merge(
  reconnect$.pipe(mapTo('banner banner-reconnect')),
  hideAfterDelay$.pipe(mapTo('banner')),
  failedPing$.pipe(mapTo('banner banner-disconnect'))
)


const classNameToMsgMapper = className => {
  if (className === 'banner banner-reconnect') {
    return 'reconnected'
  } else if (className === 'banner banner-disconnect') {
    return 'disconnected'
  } else {
    return ''
  }
}
const msg$ = className$.pipe(
  map(classNameToMsgMapper)
)

export default ({ children }) => {
  const [msg, setMsg] = useState(true)
  const [className, setClassName] = useState('banner')

  useEffect(() => {
    const classNameSub = className$.subscribe(setClassName)
    const contentSub = msg$.subscribe(setMsg)
    return () => {
      classNameSub.unsubscribe()
      contentSub.unsubscribe()
    }
  })

  return (
    <>
      <div className={className} data-conn={msg}></div>
      {children}
    </>
  )
}
