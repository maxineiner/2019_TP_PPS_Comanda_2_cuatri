import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/interfaces/usuario';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { MesasService } from 'src/app/servicios/mesas.service';

@Component({
  selector: 'app-home-mozo',
  templateUrl: './home-mozo.page.html',
  styleUrls: ['./home-mozo.page.scss'],
})
export class HomeMozoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public HacerPedido() {
    this.router.navigate(['/hacer-pedido']);
  }
  public ConfirmarPago() {
    this.router.navigate(['/cuenta']);
  }
  public ConfirmarPedidos() {
    this.router.navigate(['/mozo-aceptar']);
  }
  public TerminarPedidos() {
    this.router.navigate(['/mozo-terminar']);
  }

  encuesta(){
    this.router.navigate(['/encuesta-empleado']);
  }
}
