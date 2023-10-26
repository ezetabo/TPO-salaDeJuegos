import { Component, OnInit } from '@angular/core';
import { isEqual } from 'lodash';
import { Grid } from 'src/app/interfaces/tablero.interface';
import { ScoreService } from 'src/app/services/score.service';
import { SodokuService } from 'src/app/services/sodoku.service';
import { deepCopy } from 'src/app/utils/helper-functions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propio',
  templateUrl: './propio.component.html',
  styleUrls: ['./propio.component.css']
})
export class PropioComponent {
  public sudokuData!: Grid;
  public sudokuJugador?: Grid;
  public solution: boolean = false;
  public intentos: number = 0;

  constructor(private sS: SodokuService, private score: ScoreService) { }


  newGame(): void {
    this.sS.getGrid().subscribe(tbl => {
      this.sudokuData = deepCopy(tbl);
      this.sudokuJugador = deepCopy(tbl);
      this.sudokuData.solution?.forEach(x => console.log(x));
      this.intentos = 3;
    });
    this.score.resultados.sodoku.partidas += 1;
    this.score.resultados.sodoku.ultimaJugada = new Date().toISOString();
    this.score.guardar(this.score.resultados.sodoku,'sodoku');
  }

  check() {
    if (this.sudokuJugador && this.intentos > 0) {
      this.solution = !this.solution;
      this.intentos -= 1;
    }
  }


  reintentar() {
    if (this.sudokuData) {
      this.sudokuJugador = deepCopy(this.sudokuData);
    }
  }



  entregar(): void {

    if (this.sudokuData) {
      if (this.areMatricesEqual()) {
        this.score.resultados.sodoku.ganadas += 1;
        this.score.guardar(this.score.resultados.sodoku,'sodoku');
        console.log('Las matrices son iguales');
        Swal.fire({
          position: 'center-end',
          icon: 'success',
          title: 'Felicitaciones Tablero CORRECTO',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.log('Las matrices son distintas');
        Swal.fire({
          title: 'Oops...',
          icon: 'error',
          text: `"El tablero no es correcto"`
        });
      }
    }
  }

  isInitialValue(row: number, col: number, solucion: boolean = false): boolean {

    if (solucion) {
      return this.sudokuData.solution![row][col] == this.sudokuJugador!.value[row][col];
    } else {
      return this.sudokuData.value[row][col] > 0;
    }
  }

  areMatricesEqual(): boolean {
    if (this.sudokuData && this.sudokuJugador) {
      return isEqual(this.sudokuData.solution, this.sudokuJugador.value);
    }
    return false;
  }

  disableKeyboardInput(event: KeyboardEvent): void {
    event.preventDefault();
  }

}
