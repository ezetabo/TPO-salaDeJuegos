import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { Jugar, Preguntados, Resultados } from '../interfaces/resultados.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreDBService {

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

  private resultados: Resultados = {
    id: '',
    ahorcado: this.juegoNuevo,
    mayorMenor: this.juegoNuevo,
    sodoku: this.juegoNuevo,
    preguntados: this.preguntadosNuevo,
    usuario: ''
  }

  private dataRef = collection(this.fs, 'resultados');

  constructor(private fs: Firestore) { }


  crear(email: string) {
    this.resultados.usuario = email;
    this.guardar(this.resultados)
  }


  guardar(newData: Resultados) {
    const docs = doc(this.dataRef);
    newData.id = docs.id;
    setDoc(docs, newData);
  }

  traer(): Observable<Resultados[]> {
    return new Observable<Resultados[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const resultados: Resultados[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Resultados;
          resultados.push(one);
        });
        observer.next(resultados);
      });
    });
  }

  taerPorId(rs: Resultados): Observable<Resultados | null> {
    const documentRef = doc(this.dataRef, rs.id);

    return new Observable<Resultados | null>((observer) => {
      onSnapshot(documentRef, (snapshot) => {
        if (snapshot.exists()) {
          const resultado = snapshot.data() as Resultados;
          observer.next(resultado);
        } else {
          observer.next(null);
        }
      });
    });
  }


  modificar(hl: Resultados) {
    const docs = doc(this.dataRef, hl.id);
    const newData = {
      ahorcado: {
        partidas: hl.ahorcado.partidas,
        ganadas: hl.ahorcado.ganadas,
        ultimaJugada:  hl.ahorcado.ultimaJugada
      },
      mayorMenor: {
        partidas: hl.mayorMenor.partidas,
        ganadas: hl.mayorMenor.ganadas,
        ultimaJugada: hl.mayorMenor.ultimaJugada
      },
      sodoku: {
        partidas: hl.sodoku.partidas,
        ganadas: hl.sodoku.ganadas,
        ultimaJugada: hl.sodoku.ultimaJugada
      },
      preguntados: {
        partidas: hl.preguntados.partidas,
        preguntas: hl.preguntados.preguntas,
        correctas: hl.preguntados.correctas,
        deporte: hl.preguntados.deporte,
        geografia: hl.preguntados.geografia,
        ciencia: hl.preguntados.ciencia,
        general: hl.preguntados.general,
        historia: hl.preguntados.historia,
        arte: hl.preguntados.arte,
        entretenimiento: hl.preguntados.partidas,
        ultimaJugada: hl.preguntados.ultimaJugada
      }
    }

    updateDoc(docs, newData);
  }

  borrar(hl: Resultados) {
    const docs = doc(this.dataRef, hl.id);
    deleteDoc(docs);
  }

}
