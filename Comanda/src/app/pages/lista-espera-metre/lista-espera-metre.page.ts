import { Component, OnInit } from '@angular/core';
import { ListaEsperaMesaService } from '../../services/lista-espera-mesa.service';
import { ClienteEspera } from '../../model/clienteEspera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-espera-metre',
  templateUrl: './lista-espera-metre.page.html',
  styleUrls: ['./lista-espera-metre.page.scss'],
})
export class ListaEsperaMetrePage implements OnInit {
  
  clientes: ClienteEspera[];

  constructor(
    private listaEsperaMesaService: ListaEsperaMesaService,
    public router: Router) { }

  ngOnInit() {
    this.listaEsperaMesaService.getListaEsperaMesa().subscribe(actionArray => {
      this.clientes = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as ClienteEspera;
      })
    });
  }

  asignar(cliente: ClienteEspera) {
    this.presentModal(cliente);
  }

  presentModal(c: ClienteEspera) {
    this.router.navigate(['/mesas-modal'], { queryParams: {idAuth: c.idAuth}});   
  }

}
