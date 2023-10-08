import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (): Observable<boolean> | boolean => {
    return new Observable<boolean>((observer) => {
      this.authService.loggedIn().then((loggedIn) => {
        if (!loggedIn) {
          observer.next(true);
          observer.complete();
        } else {

          this.router.navigate(['/menu']);
          observer.next(false);
          observer.complete();
        }
      });
    });
  };
}
