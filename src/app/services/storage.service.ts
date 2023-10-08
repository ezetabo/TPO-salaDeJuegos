import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Chats } from '../interfaces/chats.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private fs: Firestore) { }

  addData(newData: Chats,owner:string) {
    const dataRef = collection(this.fs, owner);
    return addDoc(dataRef, newData);
  }

}
