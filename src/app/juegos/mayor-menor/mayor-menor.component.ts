import { Component, OnInit } from '@angular/core';
import { Card, Mazo } from 'src/app/interfaces/mazo.interface';
import { MazoInfo } from 'src/app/interfaces/mazoInfo.interface';
import { CardsService } from 'src/app/services/cards.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {
  private back = environment.cardsBack;
  public cartaVacia: Card = {
    code: '',
    image: this.back,
    images: { svg: '', png: '' },
    value: '',
    suit: '',
    number: 0,
  };
  private mazoInfo!: MazoInfo;
  private mazo!: Mazo;
  public cartaAnterior: Card = this.cartaVacia;
  public cartaActual: Card = this.cartaVacia;
  private cartaSiguiente: Card = this.cartaVacia;;
  public score: number = 0;
  public estado: string = 'ok';


  constructor(private srvCards: CardsService) { }
  ngOnInit(): void {
    this.getMazoInfo();
  }

  private getMazoInfo(): void {
    this.srvCards.getMazo(1)
      .subscribe(mazo => {
        this.mazoInfo = mazo;
        this.srvCards.getCartas(this.mazoInfo!.deck_id, 2)
          .subscribe(mazo => {
            this.mazo = mazo;
            this.cartaActual = this.mazo!.cards[0];
            this.cartaSiguiente = this.mazo!.cards[1];
          })

      })
  }

  private getCartas(cantidad: number = 1): void {
    this.srvCards.getCartas(this.mazoInfo!.deck_id, cantidad)
      .subscribe(mazo => {
        this.mazo = mazo;
      })
  }

  actualizarMano(): void {
    this.cartaAnterior = this.cartaActual;
    this.cartaActual = this.cartaSiguiente;
    this.getCartas(1);
    this.cartaSiguiente = this.mazo.cards[0];
  }

  jugar(eleccion: string): void {
    let resultado = 'gano';
    if (this.mazo!.remaining > 0) {
      if ((eleccion === 'mayor' && this.cartaActual.number <= this.cartaSiguiente.number) ||
        (eleccion === 'menor' && this.cartaActual.number >= this.cartaSiguiente.number)) {
        resultado = 'ok';
        this.score += 1;
        this.actualizarMano();
        console.log(this.cartaSiguiente.number, this.mazo.remaining);
      } else {
        resultado = 'perdio';
        this.actualizarMano();
      }
    }
    this.estado = resultado;

  }

  reiniciar() {
    this.score = 0;
    this.estado = 'ok';
    this.cartaAnterior = this.cartaVacia;
    this.cartaActual = this.cartaVacia;
    this.cartaSiguiente = this.cartaVacia;
    this.getMazoInfo();
  }

}
