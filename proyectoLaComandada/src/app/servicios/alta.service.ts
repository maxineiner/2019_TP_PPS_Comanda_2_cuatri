import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Entidad} from '../modals/entidad'
@Injectable({
  providedIn: 'root'
})
export class AltaService {

  refEntidad : AngularFirestoreCollection<Entidad>;


  constructor(private bd : AngularFirestore,private auth : AngularFireAuth){ 
  }


  altaeEntidad(objeto : Entidad){

    try{
      console.log("entre al servicio " + objeto.apellido + " " + objeto.correo);
       this.auth.auth.createUserWithEmailAndPassword(objeto.correo,objeto.clave);

      this.bd.collection("entidades").add(
        {
          apellido : objeto.apellido,
          clave : objeto.clave,
          correo : objeto.correo,
          cuit : objeto.cuit,
          dni : objeto.dni,
          foto : objeto.foto,
          nombre : objeto.nombre,
          perfil : objeto.perfil
        }
      )
      //  this.refEntidad.add(objeto).then(data =>{
      //   console.log(data);
      //  });
       //para que es este add?
    }
    catch(e){
      console.log(e);
    }
  }
}
