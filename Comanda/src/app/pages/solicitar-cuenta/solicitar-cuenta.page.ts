import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/model/pedido';
import { Detalle } from 'src/app/model/detalle';
import { AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-solicitar-cuenta',
  templateUrl: './solicitar-cuenta.page.html',
  styleUrls: ['./solicitar-cuenta.page.scss'],
})
export class SolicitarCuentaPage implements OnInit {


  auxPedido:Pedido;
  arrayDetalles:Array<Detalle> = [];
 
  constructor(private authService:AuthService) { }

  ngOnInit() {
    // this.auxPedido = new Pedido(this.authService.currentUserId(),this.arrayDetalles,"PENDIENTE",this.valorCarrito);
  }

}
