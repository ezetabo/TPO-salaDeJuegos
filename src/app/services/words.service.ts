import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class WordApiService {
  private apiUrl = environment.wordsURL;

  constructor(private http: HttpClient, private servTrnl: TranslationService) { }

  getRandomWord(idioma: string = 'es'): Observable<string> {
    const url = `${this.apiUrl}1`;
    return this.http.get<string[]>(url).pipe(
      map(palabras => (palabras.length > 0 ? palabras[0] : '')),
      switchMap(palabra =>{
        console.log(palabra);
        return this.traducirPalabra(palabra, idioma)}),
      map(palabraTraducida => palabraTraducida.split(' ')[0])
    );
  }

  traducirPalabra(palabra: string, idioma: string = 'es'): Observable<string> {
    return from(this.servTrnl.traducir(palabra, idioma));
  }
}
