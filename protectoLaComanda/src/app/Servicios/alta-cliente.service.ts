import { Injectable } from '@angular/core';
import {  AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {  AngularFireAuth } from '@angular/fire/auth';
import { Entidad } from '../modals/entidad';

@Injectable()
export class AltaClienteService {

    colecion: AngularFirestoreCollection<Entidad>

    constructor(private angularFirestore: AngularFirestore, private angular : AngularFireAuth) { 
        this.colecion = this.angularFirestore.collection<Entidad>("entidades");
    }

    async AltaCliente(cliente : Entidad)
    {
        await this.angular.auth.createUserWithEmailAndPassword(cliente["correo"],cliente["clave"]).then(
           accion =>
           {
            let id = this.angularFirestore.createId();
            cliente.id = id;
            this.colecion.doc(id).set(cliente);
           }
           
        );
    }

}