import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from '../../model/pedido';
import { NavParams, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalle-pedido-modal',
  templateUrl: './detalle-pedido-modal.page.html',
  styleUrls: ['./detalle-pedido-modal.page.scss'],
})

export class DetallePedidoModalPage implements OnInit {

  @Input() pedido: Pedido;

  constructor(
    public router: Router,
    public modalCtrl: ModalController) { }

  ngOnInit() {
    // this.pedido.arrayDetalle.forEach(element => {
      
    //   // this.productos.push();
    // });
    
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}


