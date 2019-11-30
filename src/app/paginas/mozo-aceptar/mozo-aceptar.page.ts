import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { MesasService } from 'src/app/servicios/mesas.service';
import { AlertService } from 'src/app/servicios/alert.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';
import { SpinerService } from 'src/app/servicios/spiner.service';

@Component({
  selector: 'app-mozo-aceptar',
  templateUrl: './mozo-aceptar.page.html',
  styleUrls: ['./mozo-aceptar.page.scss'],
})
export class MozoAceptarPage implements OnInit {
  public pedidos = [];
  public mesasClientes = [];
  public pedidosProductos = [];
  public productos = [];
  private mesas = [];
  usr;

  constructor(private pedidosServ: PedidosService, private prodServ: ProductosService,
    private mesasServ: MesasService, private alertServ: AlertService, private auth:AuthService,
    private emailComposer:EmailComposer,
    private spiner:SpinerService
    ) {
    }

  async ngOnInit() {
    let sp = await this.spiner.GetAllPageSpinner("");
    sp.present();

    this.usr=this.auth.getUsuario();

    this.pedidosServ.getPedidos().subscribe( (data) => {
      this.pedidos = data;
      // console.log('pedidos: ', this.pedidos);
    });
    this.pedidosServ.getPedidoProductos().subscribe( (pedproduc) => {
      this.pedidosProductos = pedproduc;
      // console.log('pedidos-productos: ', this.pedidosProductos);
    });
    this.pedidosServ.getProductos().subscribe( (data) => {
      this.productos = data;
      // console.log('productos: ', this.productos);
    });
    this.mesasServ.getMesasClientes().subscribe( (data) => {
      this.mesasClientes = data;
      // console.log('mesas-clientes: ', this.mesasClientes);
    });
    this.mesasServ.getMesas().subscribe( (data) => {
      this.mesas = data;
      // console.log('mesas: ', this.mesas);
      sp.dismiss();
    });


  }

  SendSiEmail(mail) {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send

      }
    });
    let email:EmailComposerOptions = {
      to: mail,
      cc: '',
      bcc: [],
      attachments: [
      ],
      subject: 'Code for Food: Delivery',
      body: 'Su pedido para delivery esta en preparacion. Si quiere puede entrar al chat para saber como esta su pedido',
      isHtml: true
    }

    // Send a text message using default options
    this.emailComposer.open(email).then(ret => { console.log(ret) }).catch(err => { alert(err); console.log(err) });

  }

  SendNoEmail(mail) {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send

      }
    });
    let email:EmailComposerOptions = {
      to: mail,
      cc: '',
      bcc: [],
      attachments: [
      ],
      subject: 'Code for Food: Delivery',
      body: 'Su pedido Ha sido rechazado',
      isHtml: true
    }

    // Send a text message using default options
    this.emailComposer.open(email).then(ret => { console.log(ret) }).catch(err => { alert(err); console.log(err) });

  }




  public BorrarPedido(idPedido: string, idMesaCliente: string, mail:string='') {
    this.mesasClientes.forEach(mesaCl => {
      if (mesaCl.id === idMesaCliente) {
        this.mesas.forEach(mesas => {
          if (mesas.id === mesaCl.idMesa) {
            mesas.estado = 'realizando pedido';
            this.mesasServ.updateMesa(mesas).then( () => { console.log('mesa updated'); } );
          }
        });
      }
    });
    if(mail){
      this.SendNoEmail(mail)
    }
    this.pedidosServ.DeletePedido(idPedido).then( () => { console.log('pedido borrado'); });
  }
  public AceptarPedido(idPedido: string, mail:string='') {
    this.pedidos.forEach(pedido => {
      if (pedido.id === idPedido) {
        pedido.estado = 'preparacion';
        this.mesasClientes.forEach(mesaCl => {
          if (mesaCl.id === pedido.id_mesa_cliente) {
            this.mesas.forEach(mesas => {
              if (mesas.id === mesaCl.idMesa) {
                mesas.estado = 'esperando pedido';
                this.mesasServ.updateMesa(mesas).then( () => { console.log('mesa updated'); } );
              }
            });
          }
        });
        this.pedidosProductos.forEach(pp => {
          if (pp.id_pedido === pedido.id) {
            pp.estado = 'esperando';
            this.pedidosServ.updatePedidoProducto(pp.id, pp);
          }
        });
        this.pedidosServ.updatePedido(idPedido, pedido);
        if(mail){
          this.SendSiEmail(mail)
        }
      }
    });
  }
}
