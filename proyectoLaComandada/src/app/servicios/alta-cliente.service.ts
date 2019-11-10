import { Injectable } from '@angular/core';
import {  AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AltaClienteService {

    colecion: AngularFirestoreCollection

    constructor(private angularFirestore: AngularFirestore) { 
        this.colecion = this.angularFirestore.collection("entidad");
    }

    AltaCliente(cliente)
    {
      this.colecion.add(cliente);
    }


}