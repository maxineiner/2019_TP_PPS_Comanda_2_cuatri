import { Pipe, PipeTransform } from '@angular/core';
import { PedidosFilter } from '../model/pedidosFilter';
import { Pedido } from '../model/pedido';

@Pipe({
  name: 'filtroPedidos'
})
export class FiltroPedidosPipe implements PipeTransform {

  transform(pedidos: Pedido[], filter: PedidosFilter): any {
    if (!pedidos || !filter) {
      return pedidos;
    }

    return pedidos.filter(
      pedido => filter.estadosPedido.includes(pedido.estado)
        && pedido.arrayDetalle
          .some(
            detalle => detalle.type == filter.tipoDetallePedido || filter.tipoDetallePedido == null
          )
    );
  }

}
