import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Entidad } from '../modals/entidad';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  entidadRef : AngularFirestoreCollection<Entidad>
  constructor(private bd : AngularFirestore , private auth : AngularFireAuth) {
    this.entidadRef = this.bd.collection("entidades");
   }

   traerEntidades(){
     return this.entidadRef;
   }
   actualizarClientes(entidad : Entidad){
     this.entidadRef.doc(entidad.id).update(entidad);
   }
  //  async enviarCorreo(obj : any){
  //     try {
  //       const result = await this.auth.auth.signInWithEmailAndPassword(obj.correo,obj.clave)
  //       if(result != null){
  //         result.user.sendEmailVerification("Hola");
  //         console.log(result);
  //         this.auth.auth.em
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //  }
}
