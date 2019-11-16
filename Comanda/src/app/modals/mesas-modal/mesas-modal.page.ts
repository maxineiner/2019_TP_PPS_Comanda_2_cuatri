import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/model/table';
import { MesaService } from 'src/app/services/mesa.service';
import { NavParams, AlertController } from '@ionic/angular';
import { ListaEsperaMesaService } from 'src/app/services/lista-espera-mesa.service';

@Component({
  selector: 'app-mesas-modal',
  templateUrl: './mesas-modal.page.html',
  styleUrls: ['./mesas-modal.page.scss'],
})
export class MesasModalPage implements OnInit {

  @Input() idAuth: string;
  tables: Table[];

  constructor(
    private mesaService: MesaService,    
    private navParams: NavParams,
    private alertController: AlertController) { }

  ngOnInit() {
    console.log(this.idAuth)
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
    this.presentAlert(data);
  }

  async presentAlert(data: Table) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Confirmar aginación de las mesa ' + data.number,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.mesaService.updateTable(data, this.idAuth);
          }
        }
      ]
    });

    await alert.present();
  }

}
