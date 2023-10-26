import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/interfaces/encuesta.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EncuestaDBService } from 'src/app/services/encuestaDB.service';



import { ValidatorsService } from 'src/app/services/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {
  private encuesta?: Encuesta;

  public myForm: FormGroup;

  constructor(private fb: FormBuilder,
    private vs: ValidatorsService,
    private encuestaDB: EncuestaDBService,
    private authServ: AuthService
  ) {
    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.pattern(this.vs.namePattern)]],
      edad: ['', [Validators.required, this.vs.integerValidator(), Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, this.vs.telValidator()]],
      comoLlego: ['otros', [Validators.required]],
      quiereNotificaciones: [true, [Validators.required]],
      sugerencia: ['', [Validators.required]],
    });

  }

  onSubmit() {
    if (this.myForm.valid) {
      this.encuesta = this.myForm.value;
      this.authServ.getUserEmail().subscribe(email => {
        this.encuesta!.email = email!;
        this.encuestaDB.addData(this.encuesta!);
      });
      this.myForm.reset();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'encuesta recibida',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      this.myForm.markAllAsTouched();
      return;
    }
  }

  isValidField(field: string) {
    return this.vs.isValidField(this.myForm, field);
  }

}
