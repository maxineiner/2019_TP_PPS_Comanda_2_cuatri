import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Encuesta } from '../model/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private firestore: AngularFirestore) { }

  async save(preguntaRespuesta) {
    this.firestore.collection('Encuesta_Respuesta').add({preguntaRespuesta});
  }

  getEncuestasResult() {
    return this.firestore.collection('Encuesta_Respuesta').snapshotChanges();
  }
}


