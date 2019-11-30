import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/model/pedido';
import { Detalle } from 'src/app/model/detalle';
import { AuthService} from "../../services/auth.service";
import { PedidosService } from 'src/app/services/pedidos.service';
import { Router } from '@angular/router';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { AlertModalPage } from 'src/app/modals/alert-modal/alert-modal.page';

@Component({
  selector: 'app-solicitar-cuenta',
  templateUrl: './solicitar-cuenta.page.html',
  styleUrls: ['./solicitar-cuenta.page.scss'],
})
export class SolicitarCuentaPage implements OnInit {


  auxPedido:Pedido = new Pedido(this.authService.currentUserId(),[],"PENDIENTE",0);
  arrayDetalles:Array<Detalle> = [];
  pedidos = [];
 
  constructor(private authService:AuthService,
    private pedidosService:PedidosService,
    public auth:AuthService,
    private publicRouter: Router,
    private modalController: ModalController,) { }

 ngOnInit() {
    // this.auxPedido = new Pedido(this.authService.currentUserId(),this.arrayDetalles,"PENDIENTE",0);
     this.getMiPeidoBD();
    // this.auxPedido = new Pedido(this.authService.currentUserId(),this.arrayDetalles,"PENDIENTE",this.valorCarrito);
  }
  async getMiPeidoBD() {
    await this.pedidosService.getPedidosBase().subscribe( (pedido) => {
    
      this.pedidos = [];
      pedido.forEach(auxPedido => {
        console.log(auxPedido);
        if(auxPedido.idAuth != undefined && auxPedido.estado == "CONFIRMADO" && auxPedido.propina != undefined) //creo que es cofirmado
        {
          console.log("Push");
          this.pedidos.push(auxPedido);
        }
        
      });
      // console.log(this.pedidos);
      // console.log(this.auth.currentUserId());
      this.pedidos.forEach(element => {
        console.log(element.idAuth);
        console.log(this.auth.currentUserId());
        if(element.idAuth == this.auth.currentUserId())
        {
         let detalles = JSON.parse(element.arrayDetalle);
         console.log(element.arrayDetalle);
          this.auxPedido = new Pedido(element.idAuth,detalles,element.estado,element.total);
          this.auxPedido.propina = element.propina;
          this.auxPedido.totalPropina = element.totalPropina;
  
        }
      });
      console.log(this.auxPedido.arrayDetalle);
    });
   
  }
  aceptar(){
    this.pedidosService.SetEstadoJ(this.auxPedido,"ESPERANDO CUENTA");
    this.presentModalCustom("Genial!","La Cuenta ya esta en camino");
    this.publicRouter.navigate(['/home']);
  }
  rechazar(){
    this.publicRouter.navigate(['/home']);
  }

  
  async presentModalCustom(header: string, message: string) {
    const modal = await this.modalController.create({
      component: AlertModalPage,
      cssClass: header === 'Error' ? 'my-custom-modal-css-error' : 'my-custom-modal-css',
      componentProps: {
        header: header,
        message: message,
        action: header == 'Error' ? 'error' : header == 'Info' ? 'info' : 'confirm',
      }
    });
  }
}
