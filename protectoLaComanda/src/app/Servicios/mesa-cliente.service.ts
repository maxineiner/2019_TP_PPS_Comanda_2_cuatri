import { Injectable } from '@angular/core';
import {  AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Entidad } from '../modals/entidad';
import { LoginService } from './login.service';
import { Mesa } from '../modals/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaClienteService {

  
  colecion: AngularFirestoreCollection<Entidad>
  colecionMesa : AngularFirestoreCollection<Mesa>
  constructor(private angularFirestore: AngularFirestore, private login : LoginService) { 
    this.colecion = this.angularFirestore.collection<Entidad>("entidades");
    this.colecionMesa = this.angularFirestore.collection<Mesa>("mesas");
  }

  cambiarEstadoAPendiente(cliente : Entidad)
  {
    console.log(cliente.id);
    this.colecion.doc(cliente.id).set(cliente);
  }

  cambiarEstadoMesaAOcupadoXUsuarioActual(mesa : Mesa,cliente : Entidad)
  {
    this.colecionMesa.doc(mesa.id).set(mesa);
    this.colecion.doc(cliente.id).set(cliente);
  }

  traerMesaId(numero : string)
  {
    return this.angularFirestore.collection<Mesa>("mesas", ref => ref.where("numero","==",numero)).valueChanges();
  }

}
