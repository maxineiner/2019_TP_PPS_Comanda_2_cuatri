import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Table } from '../model/table';
import { ListaEsperaMesaService } from './lista-espera-mesa.service';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(
    private firestore: AngularFirestore,
    private listEsperaMesaService: ListaEsperaMesaService) { }

  public getTableAvailable() {
    return this.firestore.collection('Mesas').snapshotChanges();
  }

  public saveTable(table: Table) {
    this.firestore.collection('Mesas').add({
      number: table.number,
      capacity: table.capacity,
      type: table.type,
      image: table.image
    });
  } 

  public async updateTable(data: Table, idAuth) {
    await this.firestore.doc('Mesas/' + data.id).update(data)
      .then(doc => {
        this.listEsperaMesaService.deleteCliente(idAuth);
      });
  }

  public async getTableByClient(idAuth) {
    return await this.firestore.collection('Mesas').ref
      .where('idAuth', '==' , idAuth)
      .get();
  }

}
