import { Injectable } from '@angular/core';
import {  AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {  AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AltaClienteService {

    colecion: AngularFirestoreCollection

    constructor(private angularFirestore: AngularFirestore, private angular : AngularFireAuth) { 
        this.colecion = this.angularFirestore.collection("entidades");
    }

    async AltaCliente(cliente)
    {
        await this.angular.auth.createUserWithEmailAndPassword(cliente["correo"],cliente["clave"]).then(
           accion =>
           {
            this.colecion.add(cliente); 
           }
           
        );
    }


}