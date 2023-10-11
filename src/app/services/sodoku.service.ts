import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grid, Tablero } from '../interfaces/tablero.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SodokuService {

  constructor(private http: HttpClient) { }

  getGrid(): Observable<Grid> {
    return this.http.get<Tablero>('https://sudoku-api.vercel.app/api/dosuku').pipe(
      map(x => x.newboard.grids[0])
    )
  }
}
