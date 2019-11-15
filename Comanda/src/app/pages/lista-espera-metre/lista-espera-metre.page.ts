import { Component, OnInit } from '@angular/core';
import { ListaEsperaMesaService } from 'src/app/services/lista-espera-mesa.service';
import { ClienteEspera } from 'src/app/model/clienteEspera';
import { ModalController } from '@ionic/angular';
import { MesasModalPage } from 'src/app/modals/mesas-modal/mesas-modal.page';

@Component({
  selector: 'app-lista-espera-metre',
  templateUrl: './lista-espera-metre.page.html',
  styleUrls: ['./lista-espera-metre.page.scss'],
})
export class ListaEsperaMetrePage implements OnInit {
  clientes: ClienteEspera[];

  constructor(
    private listaEsperaMesaService: ListaEsperaMesaService,
    private modalController: ModalController) { }

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

  async presentModal(c: ClienteEspera) {
    const modal = await this.modalController.create({
      component: MesasModalPage,
      componentProps: {
        idAuth: c.idAuth        
      }
    });
    return await modal.present();
  }

}
