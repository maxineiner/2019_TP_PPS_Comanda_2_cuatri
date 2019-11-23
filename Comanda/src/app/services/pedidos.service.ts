import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private firestore: AngularFirestore) { }

  public AddPedidoToBD(auxPedido:Pedido) {
    console.log(auxPedido);
    this.firestore.collection('Lista_Pedidos').add({
      idAuth:auxPedido.idAuth,
      total: auxPedido.total,
      estado: auxPedido.estado,
      arrayDetalle: JSON.stringify(auxPedido.arrayDetalle),

    });
  }

  public getPedidos() {
    return this.firestore.collection('Lista_Pedidos').snapshotChanges();
  }

  public async UpdatePedido(data: Pedido) {
    await this.firestore.doc('Lista_Pedidos/' + data.id).update(data);
  }
}
