import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActorTypeBase } from '../model/actorTypeBase';
import { Producto } from '../model/producto';
import { Table } from '../model/table';

@Injectable({
  providedIn: 'root'
})
export class ComandaServiceService {

  constructor(
    private firestore: AngularFirestore) { }

  public saveActorType(actorType: ActorTypeBase) {
    this.firestore.collection('Empleados').add({
      name: actorType.name,
      lastName: actorType.lastName,
      dni: actorType.dni,
      cuil: actorType.cuil,
      image: actorType.image,
      type: actorType.type
    });
  }

  public saveProductos(producto: Producto) {
    this.firestore.collection('Productos').add({
      name: producto.name,
      descripcion: producto.descripcion,
      tiempo: producto.tiempo,
      precio: producto.precio,
      image: producto.image.toString()
      // image: actorType.image,
      // type: actorType.type
    });
  }

  public getRol_user() {
    return this.firestore.collection('Rol_User').snapshotChanges();
  }

  public addListaEspera(email: string, id: string) {
    this.firestore.collection('Lista_Espera').add({
      email: email,
      idAuth: id
    });
  }
  public saveTable(table: Table) {
    this.firestore.collection('Mesas').add({
      number: table.number,
      capacity: table.capacity,
      type: table.type,
      image: table.image
    });
  }

}
