import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Entidad} from '../modals/entidad'
@Injectable({
  providedIn: 'root'
})
export class AltaService {

  refEntidad : AngularFirestoreCollection<Entidad>


  constructor(private bd : AngularFirestore,private auth : AngularFireAuth){ 
     this.refEntidad = this.bd.collection("entidades");
  }


  altaeEntidad(objeto : Entidad){

    try{
       this.auth.auth.createUserWithEmailAndPassword(objeto.correo,objeto.clave);
       this.refEntidad.add(objeto).then(data =>{
         alert(data);
       });
       //para que es este add?
    }
    catch(e){
      console.log(e);
    }
  }
}
