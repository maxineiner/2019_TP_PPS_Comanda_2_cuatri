import { Component, OnInit, Input } from '@angular/core';
import { Table } from '../../model/table';
import { MesaService } from '../../services/mesa.service';
import { NavParams, AlertController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalPage } from '../alert-modal/alert-modal.page';

@Component({
  selector: 'app-mesas-modal',
  templateUrl: './mesas-modal.page.html',
  styleUrls: ['./mesas-modal.page.scss'],
})
export class MesasModalPage implements OnInit {

  idAuth: string;
  tables: Table[];
  valor: number;

  constructor(
    private mesaService: MesaService,    
    public router: Router,
    public modalCtrl: ModalController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idAuth = params['idAuth'];      
    });
    this.queryListTable();
  }

  queryListTable() {
    this.mesaService.getTableAvailable().subscribe(tables => {
      this.tables = tables.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Table;
      }).filter(data => data.available);
    })
  }

  assignTable(table: Table) {
    table.idAuth = this.idAuth;
    table.available = false;
    let data: Table = Object.assign({}, table);
    this.presentModalCustom('Aviso', 'Confirmar aginación de la mesa ', data);
  }

  async presentModalCustom(header: string, message: string, data: Table) {
    const modal = await this.modalCtrl.create({
      component: AlertModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        header: header,
        message: message,
        data: data,
        idAuth: this.idAuth,
        action:  'confirm'
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        this.router.navigate(['lista-espera-metre']);
    });

    return await modal.present();
  } 

}
