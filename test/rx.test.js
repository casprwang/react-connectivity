/*eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }]*/
import { merge, timer } from 'rxjs';
import { map, concat, take, withLatestFrom, share} from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

// import { className$ } from '../src/index.jsx'

const getScheduler = () => new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});


describe('basic marble test', () => {
  test('should cold observables works', () => {
    const scheduler = getScheduler();
    scheduler.run(({ cold, expectObservable }) => {
      const e1 = cold('a--b--|');
      const e2 = cold('c--d--|');
      const res = e1.pipe(
        concat(e2)
      );
      const expected = 'a--b--c--d--|';
      expectObservable(res).toBe(expected);
    });
  });

  test('shoudl hot obs works', () => {
    const scheduler = getScheduler();
    scheduler.run(({ hot, expectObservable }) => {
      const e1 = hot('----a--^--b-------c--|');
      const e2 =   hot('---d-^--e---------f-|');
      const expected =      '---(be)----c-f-|';
      expectObservable(merge(e1, e2)).toBe(expected);
    });
  });
});


test('should ', () => {
  const scheduler = getScheduler();
  scheduler.run(({cold, expectObservable}) => {
    const tick$ = timer(0, 1000, scheduler).pipe(take(10), share());
    const bla = cold('---a-----b');
    const blu = bla.pipe(
      withLatestFrom(tick$),
      map(([b]) => b)
    );
    const output = blu;
    const expect = '---a-----b';
    expectObservable(output).toBe(expect);
  });
});
