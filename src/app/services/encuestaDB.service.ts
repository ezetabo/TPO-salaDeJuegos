import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Encuesta } from '../interfaces/encuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class EncuestaDBService {


  private dataRef = collection(this.fs, 'encuestas');

  constructor(private fs: Firestore) { }

  addData(newData: Encuesta):Promise<any> {
    return addDoc(this.dataRef, newData);
  }

  getData(): Observable<Encuesta[]> {
    return new Observable<Encuesta[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const encuestas: Encuesta[] = [];
        snap.docChanges().forEach(x => {

          const one = x.doc.data() as Encuesta;

          encuestas.push(one);
        });
        observer.next(encuestas);
      });
    });
  }
}
