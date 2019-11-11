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
            return await this.traerUsuario(correo);
        } catch (error) {
            return error.message;
        }
    }
    
    async traerUsuario(correo : string)
    {
        console.log("entre a treaer usuario" + correo);
        this.angularFirestore.collection<Object>("entidades", ref => ref.where("correo","==",correo)).valueChanges().subscribe(
            datos =>{
                console.log(datos);
                switch (datos['0']["estado"]){
                    case 'pendiente':
                        console.log("pendiente");
                        return "Su solicitud de cliente aun sigue en espera de aprobacion, vuelva a intentarlo en la brevedad.";
                    case 'aprobado':
                        return "esta aprobado";
                }
            }
        );

    //     this.colecionFotos.snapshotChanges(['added']).pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     console.log({...data});
    //     return { id, ...data };
    //   })))
    }
}