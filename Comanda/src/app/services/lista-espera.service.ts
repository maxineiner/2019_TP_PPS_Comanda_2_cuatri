import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { AngularFirestore } from '@angular/fire/firestore';


import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ListaEsperaService {
  arrayClientesEspera = new Array<Cliente>();
  constructor(private firestore: AngularFirestore) { }
  
  
  public AddClientToWaitingList(auxCliente:Cliente) {
    this.firestore.collection('lista_EsperaRegistro').add({
      email:auxCliente.email,
      name: auxCliente.name,
      lastName: auxCliente.lastName,
      dni: auxCliente.dni,
      image: auxCliente.image,
      type: auxCliente.type,
      estado:auxCliente.estado
    });
  }

  public getClientsToWaitingList() {
    return this.firestore.collection('lista_EsperaRegistro').snapshotChanges().pipe(map((clientes) => {
      return clientes.map((a) => {
        const data = a.payload.doc.data() as Cliente;
        // data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  public removeClienteWaitingList(auxCliente:Cliente) {
    this.editarCliente(auxCliente);
  }

  public async editarCliente(auxCliente:Cliente) {
    // console.log(foto.id);

    await this.firestore.collection('lista_EsperaRegistro').ref.where('email', '==', auxCliente.email).get().then(async (documento) => {
   
      console.log(documento.docs[0].id);
      // console.log('EncontrÃ© el voto', votos.users);
      
      this.firestore.collection('lista_EsperaRegistro').doc(documento.docs[0].id).set({
        email:documento.docs[0].data().email,
        name: documento.docs[0].data().name,
        lastName: documento.docs[0].data().lastName,
        dni: documento.docs[0].data().dni,
        image: documento.docs[0].data().image,
        type: documento.docs[0].data().type,
       estado:"RECHAZADO"
      })
      
    });

  }


}
