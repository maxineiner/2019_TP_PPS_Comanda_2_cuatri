import { Injectable } from '@angular/core';
import {  AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {  AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AltaClienteService {

    colecion: AngularFirestoreCollection

    constructor(private angularFirestore: AngularFirestore, private angular : AngularFireAuth) { 
        this.colecion = this.angularFirestore.collection("entidades");
    }

    AltaCliente(cliente)
    {
        this.angular.auth.createUserWithEmailAndPassword(cliente["correo"],cliente["clave"]);
        this.colecion.add(cliente);
    }


}