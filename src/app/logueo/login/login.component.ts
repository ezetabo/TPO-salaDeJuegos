import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'loginFirebase';
  public showPassword: boolean = false;
  usuario = {
    email: 'pepito@gmail.com',
    password: '123456'
  }

  constructor(private authService: AuthService, private router: Router) { }

  ingresar(): void {

    const { email, password } = this.usuario

    this.authService.login(email, password)
      .then(res => {
        if (res) {
          console.log('login Ok');
          this.router.navigateByUrl('menu');
        } else {
          console.log('login error');
          Swal.fire('email o contraseña incorrectos');
        }
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
