import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, forkJoin, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorias, TriviaCategory } from '../interfaces/categorias.interface';
import { Preguntas, Pregunta } from '../interfaces/prengutas.interface';
import { TranslationService } from './translation.service';
import { getCategoryById, getIdByCategory } from '../utils/helper-functions';

@Injectable({
  providedIn: 'root'
})
export class TriviaApiService {

  private apiUrl = environment.triviaURL;
  private categoriasUrl = environment.triviaCategoriasURL;

  constructor(private http: HttpClient, private servTransl: TranslationService) { }

  getCategorias(idioma: string = 'es'): Observable<TriviaCategory[]> {
    return this.http.get<Categorias>(this.categoriasUrl)
      .pipe(
        switchMap(catg => this.traducirCategorias(catg.trivia_categories, idioma))
      );

  }

  getPreguntaRandom(idioma: string = 'es'): Observable<Pregunta | null> {
    const url = `${this.apiUrl}?amount=1`;
    return this.http.get<Preguntas >(url).pipe(
      switchMap(async (pregunta) => {
        const preguntaTraducida = await this.traducirPregunta(pregunta.results[0], idioma);
        return preguntaTraducida;
      }),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  getPreguntaByCategoria(id: number, idioma: string = 'es'): Observable<Pregunta | null> {
    const url = `${this.apiUrl}?amount=1&category=${id}`;
    return this.http.get<Preguntas>(url).pipe(
      switchMap(async (pregunta) => {
        const preguntaTraducida = await this.traducirPregunta(pregunta.results[0], idioma);
        return preguntaTraducida;
      }),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  private traducirCategorias(categorias: TriviaCategory[], idioma: string = 'es'): Observable<TriviaCategory[]> {
    const observables = categorias.map(async (categoria) => {
      const nombreTraducido = await this.servTransl.traducir(categoria.name, idioma);
      return { ...categoria, name: nombreTraducido };
    });

    return forkJoin(observables);
  }

  private async traducirPregunta(pregunta: Pregunta, idioma: string = 'es'): Promise<Pregunta> {
    const categoriaTraducida = await this.servTransl.traducir(pregunta.category, idioma);
    const preguntaTraducida = await this.servTransl.traducir(pregunta.question, idioma);
    const respuestaCorrectaTraducida = await this.servTransl.traducir(pregunta.correct_answer, idioma);    
    const group = getCategoryById(getIdByCategory(categoriaTraducida));
    const respuestasIncorrectasTraducidas = await Promise.all(
      pregunta.incorrect_answers.map(async (respuesta) => {
        return await this.servTransl.traducir(respuesta, idioma);
      })
    );

    return {
      ...pregunta,
      category: categoriaTraducida,
      question: preguntaTraducida,
      correct_answer: respuestaCorrectaTraducida,
      incorrect_answers: respuestasIncorrectasTraducidas,
      group: group,
    };
  }



}
