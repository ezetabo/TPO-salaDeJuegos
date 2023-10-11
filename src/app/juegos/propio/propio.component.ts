import { Component, OnInit } from '@angular/core';
import { isEqual } from 'lodash';
import { Grid } from 'src/app/interfaces/tablero.interface';
import { SodokuService } from 'src/app/services/sodoku.service';
import { deepCopy } from 'src/app/utils/helper-functions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propio',
  templateUrl: './propio.component.html',
  styleUrls: ['./propio.component.css']
})
export class PropioComponent implements OnInit {
  public sudokuData!: Grid;
  public sudokuJugador!: Grid;

  constructor(private sS: SodokuService) { }

  ngOnInit(): void {
    this.sS.getGrid().subscribe(tbl => {
      this.sudokuData = deepCopy(tbl);
      this.sudokuJugador = deepCopy(tbl);
    });
  }

  check() {
    console.log('matriz solucion')
    this.sudokuData.solution!.forEach(x => console.log(x));

    if (this.areMatricesEqual()) {
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


  isInitialValue(row: number, col: number): boolean {
    return this.sudokuData.value[row][col] !== 0;
  }

  areMatricesEqual(): boolean {
    if (this.sudokuData && this.sudokuJugador) {
      return isEqual(this.sudokuData.solution, this.sudokuJugador.value);
    }
    return false;
  }
}
