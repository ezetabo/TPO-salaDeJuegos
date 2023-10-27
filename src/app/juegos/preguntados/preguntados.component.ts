import { Ctg } from './../../interfaces/ctg.interface';
import { Component, OnInit } from '@angular/core';

import { Pregunta } from 'src/app/interfaces/prengutas.interface';

import { TriviaApiService } from 'src/app/services/trivia.service';
import { generarOpciones, getCategorias, getIdByCategory, cambiarEstadoDeCategoria, getCategoryById } from '../../utils/helper-functions';
import Swal from 'sweetalert2';
import { ImagenService } from 'src/app/services/imagen.service';
import { ScoreService } from 'src/app/services/score.service';


@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  public respuesta: string = '';
  public correctas: number = 0;
  public opciones: string[] = [];
  public categoria: Ctg = { nombre: '', ganada: false };
  public categorias: Ctg[] = [];
  public pregunta?: Pregunta;
  public cantidadDeBarras = 0;
  public ocultarCtg: boolean = false;
  public imagenDeFondo: string = '';

  constructor(private servTrivia: TriviaApiService, private sI: ImagenService, private sc: ScoreService) { }

  ngOnInit(): void {
    this.categorias = getCategorias();
  }


  generarPregunta(): void {

    this.servTrivia.getPreguntaRandom()
      .subscribe(p => {
        if (p) {
          this.pregunta = p;
          this.getImagen(p.category)
          this.categoria.nombre = p.group;
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
          this.getImagen(p.category)
          this.categoria.nombre = getCategoryById(catg);
          this.opciones = generarOpciones(this.pregunta.incorrect_answers, this.pregunta.correct_answer)
          console.log(this.pregunta.correct_answer)
        } else {
          this.preguntaByCategoria(corona)
        }
      });
  }

  responder(res: string, corona: boolean = false): boolean {
    let ok = false;
    this.sc.resultados.preguntados.preguntas += 1;
    this.sc.resultados.preguntados.ultimaJugada = new Date().toString();
    if (this.pregunta!.correct_answer === res) {
      this.cantidadDeBarras += 1;
      this.correctas += 1;
      ok = true;
      this.sc.resultados.preguntados.correctas += 1;
      if (corona) {
        switch (this.categoria.nombre) {
          case 'Deportes':
            this.sc.resultados.preguntados.deporte += 1;
            break;
          case 'Arte':
            this.sc.resultados.preguntados.arte += 1;
            break;
          case 'Ciencia y naturaleza':
            this.sc.resultados.preguntados.ciencia += 1;
            break;
          case 'Geografia':
            this.sc.resultados.preguntados.geografia += 1;
            break;
          case 'Historia y Politica':
            this.sc.resultados.preguntados.historia += 1;
            break;
          case 'Entretenimiento':
            this.sc.resultados.preguntados.entretenimiento += 1;
            break;
          default:
            this.sc.resultados.preguntados.general += 1;
            break;
        }
      }
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
    if (!corona) {
      this.categoria.nombre = '';
    }
    this.pregunta = undefined;
    this.imagenDeFondo = '';
    this.sc.guardar(this.sc.resultados.preguntados,'preguntados');
    return ok;
  }

  responderCorona(res: string): void {
    if (this.responder(res, true)) {
      this.categorias = cambiarEstadoDeCategoria(this.categoria, this.categorias);
    }
    if (this.cantidadDeBarras >= 3) {
      this.cantidadDeBarras = 0;
      this.ocultarCtg = false;
    }
    this.categoria.nombre = '';
  }

  getImagen(ctg: string): void {
    this.sI.getImages(ctg).subscribe(f => {
      this.imagenDeFondo = f.src.original
    });
  }

}
