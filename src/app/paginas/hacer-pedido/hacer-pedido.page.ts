import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import { Producto } from 'src/app/interfaces/producto';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidoProducto } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { MesasService } from 'src/app/servicios/mesas.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertService } from 'src/app/servicios/alert.service';
import { AlertController } from '@ionic/angular';
import { SpinerService } from 'src/app/servicios/spiner.service';

@Component({
  selector: 'app-hacer-pedido',
  templateUrl: './hacer-pedido.page.html',
  styleUrls: ['./hacer-pedido.page.scss'],
})
export class HacerPedidoPage implements OnInit {
  public productos: Producto[];
  public cantidad: number;
  direccion:any=false;
  public pedido = {
    comienzo: (new Date()).toString(),
    estado: 'sconfirmar',
    id_mesa_cliente: '',
    'id-mesa': '',
    delivery:false,
    direccion:'',
    foto:'',
    email:''
  };
  public pedidosProductos = [];
  public mesasClientes = [];
  private idUsusario = '';
  private usuario;
  public esMozo: boolean;
  esCliente:boolean;
  constructor(private prodServ: ProductosService, private pedidoServ: PedidosService,
    private mesaServ: MesasService, private authServ: AuthService,
    private router: Router, private barcodeScanner: BarcodeScanner, 
    private alertServ: AlertService,
    private alertController: AlertController,private spiner:SpinerService) {
    this.prodServ.getProductos().subscribe( (data) => {
      this.productos = data;
      // console.log(data);
    });
    this.cantidad = 1;
  }
  async ngOnInit() {
    let sp = await this.spiner.GetAllPageSpinner("");
    sp.present();
    this.idUsusario = this.authServ.getUsuario()['id'];
    this.usuario = this.authServ.getUsuario();
    this.pedido.foto = this.usuario['foto'];
    this.pedido.email = this.usuario['mail'];
    this.mesaServ.getMesasClientes().subscribe( (data) => {
      this.mesasClientes = data;
      if (this.usuario.perfil != 'cliente' && this.usuario.perfil != 'anonimo') {
        this.esMozo = true;
      } else {
        this.esMozo = false;
        this.esCliente = this.usuario.perfil == 'cliente';

        for (const item of this.mesasClientes) {
          if (item.idCliente === this.idUsusario && !item.cerrada) {
            this.pedido.id_mesa_cliente = item.id;
            break;
          }
        }
      }
    sp.dismiss();

    });
  }

  public Agregar(idProd: string) {
    console.log(idProd);
    if (this.cantidad > 0 ) {
        const pedidoProd = {
          id_pedido: this.pedido['id'],
          estado: 'sconfirmar',
          id_producto: idProd,
          id_comanda: '',
          cantidad: this.cantidad
        };
        this.pedidosProductos.push(pedidoProd);
        this.alertServ.mensaje(''+this.cantidad+' productos','agregados')
    }
    console.log(this.pedidosProductos)
    this.cantidad = 1;
  }

  public async TerminarPedido(delivery:boolean=false) {
    let sp = await this.spiner.GetAllPageSpinner("");
    sp.present();

    if(!delivery){
      this.direccion = false;
    }
    if(this.esCliente && this.pedido.id_mesa_cliente == '' && !delivery){
      sp.dismiss();

      const alert = await this.alertController.create({
        header: 'Usted no tiene mesa',
        message:' Desea hacer un delivery?',
        inputs: [
          {
            name: 'direccion',
            type: 'text',
            placeholder: 'Direccion del pedido'
          }
        ],
        translucent: true,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.alertServ.mensaje('','No se hara el delivery')
            }
          }, {
            text: 'Aceptar',
            handler: (data) => {
              this.pedido.direccion = data['direccion'];
              this.pedido.delivery = true;
              this.pedido.id_mesa_cliente = this.usuario['id'];

              this.TerminarPedido(data['direccion'])
            }
          }
        ]
      });
      return alert.present();
    }
    if (this.pedidosProductos.length > 0) {
      // console.log(this.pedido.id_mesa_cliente);
      if ((!this.esMozo && this.pedido.direccion && this.pedido.delivery) || this.pedido.id_mesa_cliente != '' ) {
        this.mesasClientes.forEach(mCliente => {
          if (mCliente.id == this.pedido.id_mesa_cliente) {
            this.pedido['id-mesa'] = mCliente.idMesa;

            // By Eze
            this.mesaServ.getMesaPorID(mCliente.idMesa).then(mesas => {
              mesas[0].estado = 'esperando pedido';
              this.mesaServ.updateMesa(mesas[0]);
            });
          }
        });
        this.pedidoServ.AddPedido(this.pedido).then( (res) => {
          this.pedido['id'] = res['id'];
          // console.log(this.pedido);
          for (const item of this.pedidosProductos) {
            item.id_pedido = res['id'];
            this.pedidoServ.AddPedidoProducto(item).then( (res) => {
              console.log('agregado');
            });
          }
          this.alertServ.mensaje('', 'El pedido se agregó correctamente');
          if ( this.usuario.perfil == 'cliente' || this.usuario.perfil == 'anonimo') {
            this.router.navigate(['/home-cliente']);
          } else {
            this.router.navigate(['/mozo-aceptar']);
          }
        });
      } else {
        this.alertServ.mensaje('Alerta:', 'Faltan datos para generar el pedido');
      }
    }
    sp.dismiss();

  }
  public BorrarProducto(idProducto: string) {
    console.log(this.pedidosProductos);
    for (const pp of this.pedidosProductos) {
      if (pp.id_producto == idProducto) {
        const index = this.pedidosProductos.indexOf(pp);
        this.pedidosProductos.splice(index, 1);
        break;
      }
    }
  }
  public LeerQR() {
    //MICA agrega lo de poner la cantidad
    this.barcodeScanner.scan().then(resultado => {
      this.productos.forEach(producto => {
        if (producto.qr == resultado.text) {
          this.Agregar(producto.id);
        }
      });
    });
  }
}
