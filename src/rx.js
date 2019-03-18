import { timer, from, of } from 'rxjs';
import { map, catchError, switchMap, timeout, pairwise } from 'rxjs/operators';


export const timer$ = timer(0, 1000)
