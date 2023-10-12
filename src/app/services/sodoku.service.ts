import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grid, Tablero } from '../interfaces/tablero.interface';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SodokuService {

  constructor(private http: HttpClient) { }

  getGrid(): Observable<Grid> {
    return this.http.get<Tablero>(environment.sodokuURL).pipe(
      map(x => x.newboard.grids[0])
    )
  }
}
