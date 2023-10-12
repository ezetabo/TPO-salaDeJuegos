import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Imagen, Photo } from '../interfaces/imagen.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http: HttpClient) { }


  getImages(category: string): Observable<Photo> {
    const headers = new HttpHeaders({
      'Authorization': environment.img.apikey
    });
    const options = { headers: headers };
    const url = `${environment.img.url}${category}`;
    return this.http.get<Imagen>(url, options).pipe(
      map(x => x.photos[Math.floor(Math.random() *  x.photos.length)])
    );
  }



}
