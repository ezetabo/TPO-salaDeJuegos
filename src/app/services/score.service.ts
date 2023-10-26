import { Injectable } from '@angular/core';
import { Jugar, Preguntados, Resultados } from '../interfaces/resultados.interface';
import { ScoreDBService } from './scoreDB.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private juegoNuevo: Jugar = { partidas: 0, ganadas: 0, ultimaJugada: '' };
  private preguntadosNuevo: Preguntados = {
    partidas: 0,
    preguntas: 0,
    ultimaJugada: '',
    correctas: 0,
    deporte: 0,
    geografia: 0,
    ciencia: 0,
    general: 0,
    historia: 0,
    arte: 0,
    entretenimiento: 0,
  };

  public resultados: Resultados = {
    id: '',
    ahorcado: this.juegoNuevo,
    mayorMenor: this.juegoNuevo,
    sodoku: this.juegoNuevo,
    preguntados: this.preguntadosNuevo,
    usuario: ''
  }



  constructor(private scDB: ScoreDBService, private authService: AuthService) {
    this.authService.getUserEmail().subscribe(email => {
      this.resultados.usuario = email!;
      this.scDB.traer().subscribe(rsl => {
        if (rsl) {
          rsl.forEach(x => {
            if (x.usuario = this.resultados.usuario) {
              this.resultados = x;
            }
          })
        }
      });
    });
  }


  guardar(juego: Jugar | Preguntados, nombre: string) {
    switch (nombre) {
      case 'ahorcado':
        this.resultados.ahorcado = juego as Jugar;
        break;
      case 'sodoku':
        this.resultados.sodoku = juego as Jugar;
        break;
      case 'mayorMenor':
        this.resultados.mayorMenor = juego as Jugar;
        break;
      default:
        this.resultados.preguntados = juego as Preguntados;
        break;
    }
    this.scDB.modificar(this.resultados);

  }










}
