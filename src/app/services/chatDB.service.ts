import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chats } from '../interfaces/chats.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatDBService {

  private dataRef = collection(this.fs, 'chats');

  constructor(private fs: Firestore) { }

  addData(newData: Chats):Promise<any> {
    return addDoc(this.dataRef, newData);
  }

  getData(): Observable<Chats[]> {
    return new Observable<Chats[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const mensajes: Chats[] = [];
        snap.docChanges().forEach(x => {
          const msj = x.doc.data() as Chats;
          mensajes.push(msj);
        });
        const mensajesOrdenados = mensajes.sort(this.compararFecha);
        observer.next(mensajesOrdenados);
      });
    });
  }

  compararFecha(m1: Chats, m2: Chats): number {
    const fechaA = new Date(m1.fecha).getTime();
    const fechaB = new Date(m2.fecha).getTime();
    return fechaA - fechaB;
  }
}
