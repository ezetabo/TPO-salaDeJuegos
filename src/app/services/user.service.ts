import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore, collection, doc, getDocs, onSnapshot, query, setDoc, where } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataRef = collection(this.fs, 'usuarios');

  constructor(private fs: Firestore) { }

  guardar(newData: Usuario) {
    const docs = doc(this.dataRef);
    newData.id = docs.id;
    setDoc(docs, newData);
  }

  traer(): Observable<Usuario[]> {
    return new Observable<Usuario[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const usuarios: Usuario[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Usuario;
          usuarios.push(one);
        });
        observer.next(usuarios);
      });
    });
  }

  buscarPorEmail(email: string): Observable<Usuario> {
    const queryRef = query(this.dataRef, where('usuario', '==', email));
    return new Observable<Usuario>((observer) => {
      onSnapshot(queryRef, (snap) => {
        snap.docChanges().forEach(x => {
          const usuario = x.doc.data() as Usuario;
          observer.next(usuario);
        });
      });
    });
  }

}
