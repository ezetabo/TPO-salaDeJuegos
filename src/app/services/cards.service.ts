import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MazoInfo } from '../interfaces/mazoInfo.interface';
import { Card, Mazo } from '../interfaces/mazo.interface';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private urlMazo = environment.cardsGetMazo;

  constructor(private http: HttpClient) { }

  getMazo(cantidad: number = 1): Observable<MazoInfo> {
    const url = `${this.urlMazo}${cantidad}`;
    return this.http.get<MazoInfo>(url);
  }

  getCartas(idMazo: string, cantidad: number = 1): Observable<Mazo> {
    const url = `${environment.cardsGetCard1}${idMazo}${environment.cardsGetCard2}${cantidad}`;
    return this.http.get<Mazo>(url).pipe(
      map((mazo) => {
        mazo.cards = mazo.cards.map((carta) => this.actualizarValores(carta));
        return mazo;
      })
    );
  }


  mezclar(idMazo: string, soloRestantes: boolean = false): void {
    const url = `${environment.cardsShuffle1}${idMazo}${environment.cardsShuffle2}${soloRestantes}`;
    this.http.get(url);
  }

  private actualizarValores(carta: Card): Card {
    let valorActual = carta.value.toLowerCase();
    valorActual = valorActual.replace('jack', '11').replace('queen', '12').replace('king', '13').replace('ace', '14');
    carta.number = parseInt(valorActual);
    return carta;
  }


}
