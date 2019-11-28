import { Component, OnInit } from '@angular/core';
import { VerificarPedidoService } from '../../Servicios/verificar-pedido.service';

@Component({
  selector: 'app-verificar-estado-pedido',
  templateUrl: './verificar-estado-pedido.component.html',
  styleUrls: ['./verificar-estado-pedido.component.scss'],
})
export class VerificarEstadoPedidoComponent implements OnInit {

  constructor(private verificar : VerificarPedidoService) {

  }

  ngOnInit() {

  }

  async inicio()
  {
    let mesa = localStorage.getItem("mesaCliente");
    this.verificar.traerPedidoPorMesa(mesa);
  }

}
