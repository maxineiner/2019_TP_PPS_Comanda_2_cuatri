import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Entidad} from '../modals/entidad'
@Injectable({
  providedIn: 'root'
})
export class AltaService {

  refEntidad : AngularFirestoreCollection<Entidad>
  constructor(private bd : AngularFirestore,private auth : AngularFireAuth) { 
     this.refEntidad = this.bd.collection("entidades");
  }
  altaeEntidad(obj : Entidad){
    
    try{
       this.auth.auth.createUserWithEmailAndPassword(obj.correo,obj.clave);
       this.refEntidad.add(obj);
    }
    catch(e){
      console.log(e);
    }
  }
}
