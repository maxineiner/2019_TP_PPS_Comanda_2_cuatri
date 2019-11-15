import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListaEsperaMesaService {

  constructor(private firestore: AngularFirestore) { }

  public getListaEsperaMesa() {
    return this.firestore.collection('Lista_Espera').snapshotChanges();
  }

  public async deleteCliente(idAuth) {
    await this.firestore.collection('Lista_Espera').ref
      .where('idAuth', '==', idAuth)
      .get().then(async (documento) => {
        await this.firestore.collection('Lista_Espera').doc(documento.docs[0].id).delete();
      })
  }

  public async existeEnListaEspera(idAuth) {
    return await this.firestore.collection('Lista_Espera').ref
      .where('idAuth','==', idAuth )
      .get();
  }
}
