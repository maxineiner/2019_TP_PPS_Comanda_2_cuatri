import { Injectable } from '@angular/core';
import {  AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Pedido } from '../modals/pedido';
import { Entidad } from '../modals/entidad';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosClienteService {

  colecionMesa : AngularFirestoreCollection<Pedido>
  colecionCliente : AngularFirestoreCollection<Entidad>

  constructor(private angularFirestore: AngularFirestore,private login : LoginService)
  {
    this.colecionMesa = this.angularFirestore.collection<Pedido>("pedidos");
    this.colecionCliente = this.angularFirestore.collection<Entidad>("entidades");
  }

    agregarPedido(pedido : Pedido){
      // this.login.traerDatosUsuario().subscribe(
      //   datos =>{
      //     pedido.id = this.angularFirestore.createId();
      //     this.colecionMesa.add(pedido);

      //     // this.colecionCliente.doc(datos[0].id).update(
      //     //   {
      //     //    pedido : "si"
      //     //   }
      //     // )
      //   }
      // )
    }
}
