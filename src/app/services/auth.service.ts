import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async register(email: string, password: string): Promise<any> {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      return false;
    }
  }

  loggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async logout(): Promise<void> {
    return this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/logueo']);
      })
      .catch((error) => {
        console.error('Error al desloguear:', error);
      });
  }



  async checkUserExistence(email: string): Promise<boolean> {
    try {
      const methods = await this.afAuth.fetchSignInMethodsForEmail(email);
      return methods.length > 0;
    } catch (error) {
      return false;
    }
  }

  getUserEmail(): Observable<string | null> {
    return from(this.afAuth.currentUser).pipe(
      map((user) => {
        return user ? user.email : null;
      })
    );
  }


}



