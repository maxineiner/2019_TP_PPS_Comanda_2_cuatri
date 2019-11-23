import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { MesaService } from '../../services/mesa.service';
import { Pedido } from '../../model/pedido';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {
  pedidos = new Array<Pedido>();
  constructor(private pedidosService: PedidosService
    , private mesaService: MesaService) { }

  ngOnInit() {
    this.pedidosService.getPedidos().subscribe(actionArray => {
      this.pedidos = actionArray.map(item => {
        return {
          ...item.payload.doc.data()
        } as Pedido;
      });
      var mesaService = this.mesaService;
      this.pedidos.forEach(function (pedido) {
        mesaService.getTableByClient(pedido.idAuth).then(mesas => {
          var mesa = mesas.docs[0].data();
          pedido.numeroMesa = mesa.number;
        });
      });
    });
  }

}
