import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';

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
      propina:0,
      totalPropina:0

    });
  }

  public getPedidos() {
    return this.firestore.collection('Lista_Pedidos').snapshotChanges();
  }

  public async SetEstado(id: string, estado: string) {
    await this.firestore.doc('Lista_Pedidos/' + id).set({
      estado: estado
    }, { merge: true });
  }

public getPedidosBase() {
  return this.firestore.collection('Lista_Pedidos').snapshotChanges().pipe(map((clientes) => {
    return clientes.map((a) => {
      const data = a.payload.doc.data() as Pedido;
      // data.id = a.payload.doc.id;
      return data;
    });
  }));
}
public async SetPropina(auxCliente:Pedido) {
   console.log(auxCliente.idAuth);

  await this.firestore.collection('Lista_Pedidos').ref.where('idAuth', '==', auxCliente.idAuth).get().then(async (documento) => {
 
    console.log(documento.docs[0].id);
    // console.log('EncontrÃ© el voto', votos.users);
    
    this.firestore.collection('Lista_Pedidos').doc(documento.docs[0].id).set({
      arrayDetalle:auxCliente.arrayDetalle,
      estado:auxCliente.estado,
      idAuth:auxCliente.idAuth,
      total:auxCliente.total,
      propina:auxCliente.propina,
      totalPropina: auxCliente.totalPropina
    }//, { merge: true }
    );
    
  });

}
}