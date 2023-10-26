import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';


@Injectable({
  providedIn: 'root'
})

export class IsAdminGuard {
  constructor(private authService: AuthService,private uS :UserService) {}

  canActivate: CanActivateFn = (): Observable<boolean> | boolean => {
    return new Observable<boolean>((observer) => {
      this.authService.getUserEmail().subscribe((mail) => {
        if (mail) {
          this.uS.traer().subscribe(col => {
            const user = col.find(u => u.email === mail);
            observer.next(user!= undefined && user.esAdmin);
            observer.complete();
          });
        } else {
          observer.next(false);
          observer.complete();
        }

      });
    });
  };
}






