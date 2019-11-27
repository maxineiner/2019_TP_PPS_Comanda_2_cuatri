import { Injectable } from '@angular/core';
import {  AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Pedido } from '../modals/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosClienteService {

  colecionMesa : AngularFirestoreCollection<Pedido>
  constructor(private angularFirestore: AngularFirestore,) {
    this.colecionMesa = this.angularFirestore.collection<Pedido>("pedidos");
   }

   agregarPedido(pedido : Pedido)
   {
     pedido.id = this.angularFirestore.createId();
     this.colecionMesa.add(pedido);
   }

}
