import { AlertService } from './alert.service';
import { MesaCliente } from './../interfaces/mesa-cliente';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Mesa } from './../interfaces/mesa';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class MesasService {
  constructor(private db: AngularFirestore, private alert: AlertService) { }

  updateMesa(mesa: Mesa) {
    return this.db.collection('mesas').doc(mesa.qr).set(mesa);
  }

  updateMesaCliente(mesa: MesaCliente) {
    return this.db.collection('mesa-cliente').doc(mesa.id).set(mesa);
  }

  getMesas() {
    return this.db.collection('mesas').snapshotChanges().pipe(map(mesas => {
      return mesas.map(mesa => {
        const data = mesa.payload.doc.data() as Mesa;
        data.id = mesa.payload.doc.id;
        return data;
      });
    }));
  }
  getMesaPorID(idMesa: string) {
    return this.db.collection('mesas').ref.where('id', '==', idMesa).get()
    .then(async pedidos => {
       return await pedidos.docs.map(documento => {
        const data = documento.data() as Mesa;
        data.id = documento.id;
        return data;
      });
    });
  }

  getMesasClientes() {
    return this.db.collection('mesa-cliente').snapshotChanges().pipe(map(mesas => {
      return mesas.map(mesa => {
        const data = mesa.payload.doc.data() as MesaCliente;
        data.id = mesa.payload.doc.id;
        return data;
      });
    }));
  }
  getMesaClientePorID(idMesa: string) {
    return this.db.collection('mesa-cliente').ref.where('id', '==', idMesa).get()
    .then(async pedidos => {
       return await pedidos.docs.map(documento => {
        const data = documento.data() as MesaCliente;
        data.id = documento.id;
        return data;
      });
    });
  }

  asignarMesa(mesaCliente: MesaCliente) {
    this.db.collection('mesa-cliente').add(mesaCliente).then(() => {
      this.alert.mensaje('Mesa asignada', 'Tome asiento');
    }).catch(error => {
      this.alert.mensaje('ERROR', error);
    });
  }
}
