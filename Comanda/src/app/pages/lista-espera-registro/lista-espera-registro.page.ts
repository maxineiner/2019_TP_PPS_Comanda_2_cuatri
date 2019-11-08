import { Component, OnInit } from '@angular/core';
import {ListaEsperaService } from 'src/app/services/lista-espera.service'
import { async } from 'q';
import { Cliente } from 'src/app/model/cliente';

@Component({
  selector: 'app-lista-espera-registro',
  templateUrl: './lista-espera-registro.page.html',
  styleUrls: ['./lista-espera-registro.page.scss'],
})
export class ListaEsperaRegistroPage implements OnInit {

  constructor( private listaEsperaService:ListaEsperaService) { }

  ngOnInit() {
    this.arrayClientes = [];
    this.verLista();

  }
  arrayClientes = [];
  private async verLista() {
    this.listaEsperaService.getClientsToWaitingList().subscribe(async (clientes) => {
      
      // this.arrayClientes
      clientes.forEach(cliente => {
        if(cliente.estado == "ESPERA")
        {
          this.arrayClientes.push(cliente);
        }
        
      });
    
    });
    console.log(this.arrayClientes);
  }

  aceptar(item:Cliente) {
    console.log(item);
  }
  rechazar(item:Cliente) { 
    console.log(item);
    this.listaEsperaService.removeClienteWaitingList(item);
    let pos = this.arrayClientes.indexOf(item);
    this.arrayClientes.splice(pos,1);
  }
}
