import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'; // Asegúrate de que la ruta de importación sea correcta.
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (): Observable<boolean> | boolean => {
    return new Observable<boolean>((observer) => {
      this.authService.loggedIn().then((loggedIn) => {
        if (loggedIn) {
          observer.next(true);
          observer.complete();
        } else {
          this.router.navigate(['/logueo']);
          observer.next(false);
          observer.complete();
        }
      });
    });
  };
}






