import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MesaService } from 'src/app/services/mesa.service';
import { Table } from 'src/app/model/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.page.html',
  styleUrls: ['./alert-modal.page.scss'],
})
export class AlertModalPage implements OnInit {

  @Input() header: string;
  @Input() message: string;
  @Input() data: Table; 
  @Input() idAuth: any;
  @Input() action: string;
  number: number;

  constructor(
    public modalCtrl: ModalController, 
    private mesaService: MesaService,
    public router: Router) { }

  ngOnInit() {
    if(this.data)
      this.number = this.data.number;
  }

  asignar() {
    this.mesaService.updateTable(this.data, this.idAuth);
    this.modalCtrl.dismiss();
  }

  cerrar() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
