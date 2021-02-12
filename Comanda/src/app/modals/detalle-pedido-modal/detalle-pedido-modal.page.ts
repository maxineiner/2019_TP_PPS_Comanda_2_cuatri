import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from '../../model/pedido';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';


@Component({
  selector: 'app-detalle-pedido-modal',
  templateUrl: './detalle-pedido-modal.page.html',
  styleUrls: ['./detalle-pedido-modal.page.scss'],
})

export class DetallePedidoModalPage implements OnInit {

  @Input() pedido: Pedido;

  constructor(
    public router: Router,
    public alertController: AlertController,
    public modalController: ModalController,
    private pedidosService: PedidosService) { }

  ngOnInit() {
  }

  async cambiarEstado(pedido: Pedido, estado: string) {
    await this.pedidosService.SetEstado(pedido.id, estado);
    this.presentAlert(estado);
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentAlert(estado: string) {
    const alert = await this.alertController.create({
      header: estado,
      message: 'operación realizada exitosamente'    
    });

    await alert.present();

    this.dismiss();
  }
}


