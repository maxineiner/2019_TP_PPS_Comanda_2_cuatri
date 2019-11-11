import { Injectable } from '@angular/core';
import {  AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
    colecionFotos: AngularFirestoreCollection;
    documentoFotos: AngularFirestoreDocument;
    fotos: Observable<[]>;
    
    constructor(private angularFirestore: AngularFirestore, private auth : AngularFireAuth,private router : Router) {
    }
    
    async ingresar(usuario : string, clave : string)
    {
        try {
            let verificar = await this.auth.auth.signInWithEmailAndPassword(usuario,clave);
            let correo = await verificar.user.email;
            console.log(correo);
            console.log("entre a treaer usuario" + correo);
        } catch (error) {
            return error.message;
        }
    }
    
    traerUsuario(correo : string)
    {
        return this.angularFirestore.collection("entidades", ref => ref.where("correo","==",correo)).valueChanges();
    }
}