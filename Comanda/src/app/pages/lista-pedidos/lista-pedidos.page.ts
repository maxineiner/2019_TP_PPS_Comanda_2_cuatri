import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { MesaService } from '../../services/mesa.service';
import { Pedido } from '../../model/pedido';
import { ModalController, AlertController } from '@ionic/angular';
import { DetallePedidoModalPage } from '../../modals/detalle-pedido-modal/detalle-pedido-modal.page';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {
  pedidos = new Array<Pedido>();
  constructor(private pedidosService: PedidosService
    , private mesaService: MesaService
    , private modalController: ModalController
    ,   private alertController: AlertController) { }

  ngOnInit() {
    this.pedidosService.getPedidos().subscribe(actionArray => {
      this.pedidos = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Pedido;
      });
      
      var mesaService = this.mesaService;
      this.pedidos.forEach(function (pedido) {
        // var detalleStr = pedido.arrayDetalle.toString();
        // pedido.arrayDetalle = JSON.parse(detalleStr);
        mesaService.getTableByClient(pedido.idAuth).then(mesas => {
          var mesa = mesas.docs[0].data();
          pedido.numeroMesa = mesa.number;
        });
      });
    });
  }

  verDetalle(pedido: Pedido) {
    this.presentAlert(pedido);

  }

  async presentModal(pedido: Pedido) {
    const modal = await this.modalController.create({
      component: DetallePedidoModalPage,
      componentProps: {
        pedido: pedido      
      }
    });
    return await modal.present();
  }

  async presentAlert(pedido: Pedido) {
    const alert = await this.alertController.create({
      header: 'Confirmar Pedido',
      message: 'El pedido se enviará a preparación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Detalle',
          handler: () => {
            this.presentModal(pedido);
          }
        }
        , {
          text: 'Aceptar',
          handler: () => {
            pedido.estado = 'CONFIRMADO';
            this.pedidosService.UpdatePedido(pedido);
          }
        }
      ]
    });

    await alert.present();
  }

}
