import { Component, OnInit } from '@angular/core';
import { TriviaCategory } from 'src/app/interfaces/categorias.interface';
import { Pregunta } from 'src/app/interfaces/prengutas.interface';

import { TriviaApiService } from 'src/app/services/trivia.service';
import { generarOpciones, getCategorias } from '../../utils/helper-functions';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  public respuesta: string = '';
  public correctas: number = 0;
  public opciones: string[] = [];
  public categoria: string = '';
  public categorias: string[] = [];
  public pregunta?: Pregunta;
  public cantidadDeBarras = 0;

  constructor(private servTrivia: TriviaApiService, private modalService: BsModalService) {


  }

  ngOnInit(): void {
    this.categorias = getCategorias();
  }


  generarPregunta(): void {

    this.servTrivia.getPreguntaRandom()
      .subscribe(p => {
        if (p) {
          this.pregunta = p;
          this.categoria = p.category;
          this.opciones = generarOpciones(this.pregunta.incorrect_answers, this.pregunta.correct_answer)
          console.log(this.pregunta.correct_answer)
        } else {
          this.generarPregunta()
        }

      });

  }

  preguntaByCategoria(catg: number): void {
    this.servTrivia.getPreguntaByCategoria(catg)
      .subscribe(p => {
        if (p) {
          this.pregunta = p;
          this.opciones = generarOpciones(this.pregunta.incorrect_answers, this.pregunta.correct_answer)
          console.log(this.pregunta.correct_answer)
        } else {
          this.preguntaByCategoria(catg)
        }
      });
  }

  responder(res: string): void {
    if (this.pregunta!.correct_answer === res) {
      this.cantidadDeBarras += 1;
      this.correctas += 1;
      Swal.fire({
        position: 'center-end',
        icon: 'success',
        title: 'Respuesta correcta',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        title: 'Oops...',
        icon: 'error',
        text: `"Incorrecto"\n Respuesta correcta: "${this.pregunta!.correct_answer}"`
      });
    }
    this.categoria = '';
    this.pregunta = undefined;
    if (this.cantidadDeBarras == 3) {
      //aca deberiaelegir categoria...
    }
  }





}
