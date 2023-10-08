import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public confirmPass?: string;
  public usuario = {
    email: null,
    password: null
  }

  constructor(private authService: AuthService, private router: Router) { }

  registrarse() {
    const { email, password } = this.usuario
    if (email && password && this.confirmPass) {
      if (password === this.confirmPass) {
        this.authService.checkUserExistence(email)
          .then(existe => {
            if (existe) {
              Swal.fire('el email ya se encuentra registrado')
            } else {
              this.authService.register(email, password)
                .then(res => {
                  if (res) {
                    console.log('registro Ok');
                    this.router.navigateByUrl('menu');
                  } else {
                    console.log('registro error');
                    Swal.fire('no es posible realizar el registro');
                  }
                });
            }
          })
      } else {
        Swal.fire('las contraseñas no coinciden');
      }

    }
    else {
      Swal.fire('falta ingresar datos');
    }
  }

  togglePasswordVisibility(show:string='p'): void {
    if (show === 'p') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }


}
