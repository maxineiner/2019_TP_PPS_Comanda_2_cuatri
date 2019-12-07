import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Producto } from '../interfaces/producto';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
  ) { }

  CrearProducto(producto) {
    return new Promise((resolve, rejected) => {
      this.firestore.collection('productos').add(producto).then(ret => {
        resolve(ret)
      }).catch(err => {
        rejected(err)
      })
    });
  }

  getProductos(){
    return this.firestore.collection('productos').snapshotChanges().pipe(map((productos) => {
      return productos.map((producto) => {
        const data = producto.payload.doc.data() as Producto;
        data.id = producto.payload.doc.id;
        return data;
      });
    }));
  }
}
