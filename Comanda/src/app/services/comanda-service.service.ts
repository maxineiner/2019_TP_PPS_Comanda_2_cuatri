import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActorTypeBase } from '../model/actorTypeBase';

@Injectable({
  providedIn: 'root'
})
export class ComandaServiceService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth) { }

  public saveActorType(actorType: ActorTypeBase) {
    this.firestore.collection('Empleados').add({
      name: actorType.name,
      lastName: actorType.lastName,
      dni: actorType.dni,
      cuil: actorType.cuil,
      image: actorType.image,
      type: actorType.type
    });
  }
}
