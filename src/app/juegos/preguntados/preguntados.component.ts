import { Component, OnInit } from '@angular/core';

import { Pregunta } from 'src/app/interfaces/prengutas.interface';

import { TriviaApiService } from 'src/app/services/trivia.service';
import { generarOpciones, getCategorias, getIdByCategory } from '../../utils/helper-functions';
import Swal from 'sweetalert2';
import { Ctg } from 'src/app/interfaces/ctg.interface';

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
  public categorias: Ctg[] = [];
  public pregunta?: Pregunta;
  public cantidadDeBarras = 3;
  public ocultarCtg: boolean = false;

  constructor(private servTrivia: TriviaApiService) {


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

  preguntaByCategoria(corona: string): void {
    this.ocultarCtg = true;
    const catg: number = getIdByCategory(corona);
    this.servTrivia.getPreguntaByCategoria(catg)
      .subscribe(p => {
        if (p) {
          this.pregunta = p;
          this.categoria = p.category;
          this.opciones = generarOpciones(this.pregunta.incorrect_answers, this.pregunta.correct_answer)
          console.log(this.pregunta.correct_answer)
        } else {
          this.preguntaByCategoria(corona)
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
  }

  responderCorona(res: string): void {
    this.responder(res);
    if (this.cantidadDeBarras >= 3) {
      this.cantidadDeBarras = 0;
      this.ocultarCtg = false;
    }
  }
}
