import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

const DB = 'Lista_Espera_Mesa';

@Injectable({
  providedIn: 'root'
})
export class ListaEsperaMesaService {

  constructor(private firestore: AngularFirestore) { }

  public getListaEsperaMesa() {
    return this.firestore.collection(DB).snapshotChanges();
  }

  public async addListaEspera(email: string, id: string, img) {
    await this.firestore.collection(DB).add({
      email: email,
      idAuth: id,
      imagen: img
    });
  }

  public async deleteCliente(idAuth) {
    await this.firestore.collection(DB).ref
      .where('idAuth', '==', idAuth)
      .get().then(async (documento) => {
        await this.firestore.collection(DB).doc(documento.docs[0].id).delete();
      })
  }

  public async existeEnListaEspera(idAuth) {
    return await this.firestore.collection(DB).ref
      .where('idAuth','==', idAuth )
      .get();
  }

  public async getCliente(idAuth) {
    return await this.firestore.collection('Clientes').ref
      .where('idAuth','==', idAuth )
      .get();
  }
}
