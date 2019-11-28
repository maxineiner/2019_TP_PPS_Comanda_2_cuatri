import { Injectable } from '@angular/core';
import {  AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Entidad } from '../modals/entidad';

@Injectable()
export class LoginService {

    colecionFotos: AngularFirestoreCollection;
    documentoFotos: AngularFirestoreDocument;
    coleccionId: Observable<Entidad[]>;
    
    constructor(private angularFirestore: AngularFirestore, private auth : AngularFireAuth,private router : Router) {
        this.coleccionId = this.traerDatosUsuarioConId().pipe( map(actions => {
            return actions.map( a => {
              const data1 = a.payload.doc.data() as Entidad;
              data1.id = a.payload.doc.id;
              return data1;
            });
          }));
    }


    
    async ingresar(usuario : string, clave : string)
    {
        try {
            let verificar = await this.auth.auth.signInWithEmailAndPassword(usuario,clave);
            let correo = await verificar.user.email;
            localStorage.setItem("correo",correo);
            console.log(correo);
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    correoUsuarioActual()
    {
        let correo = localStorage.getItem('correo');
        return correo;
    }


    traerDatosUsuario()
    {
        return this.angularFirestore.collection<Entidad>("entidades", ref => ref.where("correo","==",this.correoUsuarioActual())).valueChanges();
    }

    traerDatosUsuarioConId()
    {
        return this.angularFirestore.collection<Entidad>("entidades", ref => ref.where("correo","==",this.correoUsuarioActual())).snapshotChanges();
    }

    cerrarSesion()
    {
        localStorage.clear();
        this.auth.auth.signOut();
        this.router.navigate(['']);
    }
}