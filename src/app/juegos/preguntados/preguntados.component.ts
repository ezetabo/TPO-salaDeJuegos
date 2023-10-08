import { Component, OnInit } from '@angular/core';
import { TriviaCategory } from 'src/app/interfaces/categorias.interface';
import { Pregunta } from 'src/app/interfaces/prengutas.interface';

import { TriviaApiService } from 'src/app/services/trivia.service';
import { generarOpciones } from '../../utils/helper-functions';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  public respuesta: string = '';
  public correctas: number = 0;
  public opciones: string[] = [];

  public pregunta!: Pregunta;
  constructor(private servTrivia: TriviaApiService) {


  }

  ngOnInit(): void {
    this.generarPregunta();  
  }


  generarPregunta(): void {

    this.servTrivia.getPreguntaRandom()
      .subscribe(p => {
        if (p) {
          this.pregunta = p;
          this.opciones = generarOpciones(this.pregunta.incorrect_answers, this.pregunta.correct_answer)
          console.log(this.pregunta.correct_answer)
        }else{
          this.generarPregunta()
        }

      });

  }

  preguntaByCategoria(catg:number): void {
    this.servTrivia.getPreguntaByCategoria(catg)
        .subscribe(p => {
          if (p) {
            this.pregunta = p;
            this.opciones = generarOpciones(this.pregunta.incorrect_answers, this.pregunta.correct_answer)
            console.log(this.pregunta.correct_answer)
          }else{
            this.preguntaByCategoria(catg)
          }
      });
  }

  responder(res: string): void {
    if (this.pregunta.correct_answer === res) {
      this.correctas += 1;
      this.generarPregunta();      
    } else {
      Swal.fire(`"PERDISTE"\n Respuesta correcta: "${this.pregunta.correct_answer}"`);
      this.reiniciar()
    }
  }


  reiniciar(): void {
    this.correctas = 0;
    this.generarPregunta();  
  }
}
