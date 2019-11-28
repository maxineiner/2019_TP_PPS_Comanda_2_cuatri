import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Pedido } from '../modals/pedido';

@Injectable({
  providedIn: 'root'
})
export class VerificarPedidoService {

  colecion: AngularFirestoreCollection<Pedido>

  constructor(private angularFirestore: AngularFirestore) { 
    this.colecion = this.angularFirestore.collection<Pedido>("pedidos");
  }

  traerPedidoPorMesa(numero : string)
  {
    return this.angularFirestore.collection<Pedido>("pedidos",ref=>ref.where("mesa","==",numero)).valueChanges();
  }

}
