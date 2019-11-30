import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { MesaService } from '../../services/mesa.service';
import { Pedido } from '../../model/pedido';
import { PedidosFilter } from '../../model/pedidosFilter';
import { ModalController, AlertController } from '@ionic/angular';
import { DetallePedidoModalPage } from '../../modals/detalle-pedido-modal/detalle-pedido-modal.page';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {
  pedidos = new Array<Pedido>();
  filterArgs: PedidosFilter;
  constructor(private pedidosService: PedidosService
    , private mesaService: MesaService
    , private modalController: ModalController
    , private authService: AuthService) { }

  ngOnInit() {

    this.setFilter(); 

    this.pedidosService.getPedidos().subscribe(actionArray => {
      this.pedidos = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Pedido;
      });

      var mesaService = this.mesaService;
      this.pedidos.forEach(function (pedido) {
        var detalleStr = pedido.arrayDetalle.toString();
        pedido.arrayDetalle = JSON.parse(detalleStr);
        mesaService.getTableByClient(pedido.idAuth).then(mesas => {
          var mesa = mesas.docs[0].data();
          pedido.numeroMesa = mesa.number;
        });
      });
    });
  }

  verDetalle(pedido: Pedido) {
    this.presentModal(pedido);
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

  async setFilter() {
    var rol: string;
    await this.authService.getRolwithEmail(this.authService.currentUserId()).subscribe(async (res: any) => {
      res.forEach(r => {
        if (r.idAuth == this.authService.currentUserId()) {
          rol = r.rol;
        }
      });
    });

    switch (rol) {
      case 'MOZO':
       this.filterArgs.estadosPedido = ['PENDIENTE','CONFIRMADO','EN PROGRESO', 'TERMINADO', 'RECIBIDO', 'ESPERANDO CUENTA'];
       this.filterArgs.tipoDetallePedido = null;
        break;
      case 'COCINERO':
          this.filterArgs.estadosPedido = ['CONFIRMADO','EN PROGRESO'];
          this.filterArgs.tipoDetallePedido = 'COMIDA';
        break;
      case 'BARTENDER':
          this.filterArgs.estadosPedido = ['CONFIRMADO','EN PROGRESO'];
          this.filterArgs.tipoDetallePedido = 'BEBIDA';
        break;
      default:
        break;
    }
  }



}
