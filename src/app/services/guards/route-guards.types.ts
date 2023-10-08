import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

export type CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

export type CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
