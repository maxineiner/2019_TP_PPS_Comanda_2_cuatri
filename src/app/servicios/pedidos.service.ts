import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { Pedido, PedidoProducto } from '../interfaces/pedido';
import { ProductosService } from './productos.service';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private firestore: AngularFirestore,
    private productosService: ProductosService
  ) { }

  AddPedido(pedido) {
    return new Promise((resolve, rejected) => {
      this.firestore.collection('pedidos').add(pedido).then(ret => {
        resolve(ret);
      }).catch(err => {
        rejected(err);
      });
    });
  }
  AddPedidoProducto(pedidoProducto) {
    return new Promise((resolve, rejected) => {
      this.firestore.collection('pedido-productos').add(pedidoProducto).then(ret => {
        resolve(ret);
      }).catch(err => {
        rejected(err);
      });
    });
  }
  getPedidos() {
    return this.firestore.collection('pedidos').snapshotChanges().pipe(map((pedidos) => {
      return pedidos.map((pedido) => {
        const data = pedido.payload.doc.data() as Pedido;
        data.id = pedido.payload.doc.id;
        return data;
      });
    }));
  }

  getPedido(idMesa: string) {
    // ACÁ ESTÁ EL ERROR, TRAE ÚNICAMENTE LOS REGISTROS QUE ESTÁN CON EL ESTADO "PREPARACIÓN"
    return this.firestore.collection('pedidos').ref.where('id-mesa', '==', idMesa)/*.where('estado', '==', 'preparacion')*/.get()
    .then(async pedidos => {
       return await pedidos.docs.map(documento => {
        const data = documento.data() as Pedido;
        data.id = documento.id;
        return data;
      });
    });
  }

  getPedidoProductos() {
    return this.firestore.collection('pedido-productos').snapshotChanges().pipe(map((pedidos) => {
      return pedidos.map((pedido) => {
        const data = pedido.payload.doc.data() as PedidoProducto;
        data.id = pedido.payload.doc.id;
        return data;
      });
    }));
  }

  public getPedidosProductos() {
    return this.firestore.collection('pedido-productos').snapshotChanges().pipe(map((fotos) => {
      return fotos.map((a) => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }

  updatePedido(id, pedido){
    this.firestore.collection('pedidos').doc(id).set(pedido);
  }

  updatePedidoProducto(id, pedido){
    this.firestore.collection('pedido-productos').doc(id).set(pedido);
  }

  public getProductos() {
    return this.firestore.collection('productos').snapshotChanges().pipe(map((fotos) => {
      return fotos.map((a) => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  public PagarPedido(pedido: Pedido) {
    return this.firestore.collection('pedidos').ref.where('id', '==', pedido.id).get().then(async (documento) => {
      this.firestore.collection('pedidos').doc(pedido.id).set({
          comienzo: pedido.comienzo,
          id_mesa_cliente: pedido.id_mesa_cliente,
          id_mozo: pedido.id_mozo,

          estado: 'pagado'
      })
      .catch(err => {
        console.log('Error al pagar', err);
      });
    });
  }
  public DeletePedido(idPedido: string) {
    return this.firestore.collection('pedidos').doc(idPedido).delete();
  }
}
