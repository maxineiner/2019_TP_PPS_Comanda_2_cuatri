import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Producto } from '../model/producto';


import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class GetProductosService {

  constructor(private firestore: AngularFirestore) { }

  public getProductosBase() {
    return this.firestore.collection('Productos').snapshotChanges().pipe(map((clientes) => {
      return clientes.map((a) => {
        const data = a.payload.doc.data() as Producto;
        // data.id = a.payload.doc.id;
        return data;
      });
    }));
  }
}
