import { Component, OnInit } from '@angular/core';
import { WordApiService } from 'src/app/services/words.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  public title: string = "Ahorcado";
  public idioma:string = 'es';
  public palabra: string = "";
  public palabraOculta: string = "";
  public intentos: number = 0;
  public gano: boolean = false;
  public perdio: boolean = false;
  public letras: string[] = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
    "m", "n",'ñ', "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ];
  letrasClickeadas: { [key: string]: boolean } = {};
  constructor(private serv: WordApiService) { }

  ngOnInit(): void {
    this.inicializarJuego();
  }

  inicializarJuego(): void {
    this.serv.getRandomWord(this.idioma)
      .subscribe(word => {
        console.log(word);
        this.palabra = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        this.palabraOculta = "_ ".repeat(this.palabra.length);
      });
    this.intentos = 0;
    this.gano = false;
    this.perdio = false;
    this.letrasClickeadas = {};
  }

  comprobar(letra: string): void {
    this.existeLetra(letra);
    const palabraOcultaArreglo = this.palabraOculta.split(" ");
    let i: number = 0;
    for (const char of this.palabra) {
      if (char === letra) {
        palabraOcultaArreglo[i] = letra;
      }
      i++;
    }
    this.palabraOculta = palabraOcultaArreglo.join(" ");
    this.letrasClickeadas[letra] = true;
    this.verificaGanador();
  }

  verificaGanador(): void {
    const palabraArr: string[] = this.palabraOculta.split(" ");
    const palabraEvaluar: string = palabraArr.join("");
    if (palabraEvaluar === this.palabra) {
      this.gano = true;
      console.log("Usuario GANO");
    }
    if (this.intentos === 9) {
      this.perdio = true;
      console.log("Usuario perdio");
    }
  }

  existeLetra(letra: string): void {
    if (this.palabra.indexOf(letra) === -1) {
      this.intentos++;
    }
  }
}
