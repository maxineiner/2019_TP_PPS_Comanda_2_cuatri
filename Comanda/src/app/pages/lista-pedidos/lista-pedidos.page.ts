import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { Pedido } from '../../model/pedido';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {
  pedidos = [];
  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
    this.pedidosService.getPedidos().subscribe(actionArray => {
      this.pedidos = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Pedido;
      });
      //busco user y la mesa por userid para quitarle el nombre de usuario y el numero de mesa
    });
  }

}
