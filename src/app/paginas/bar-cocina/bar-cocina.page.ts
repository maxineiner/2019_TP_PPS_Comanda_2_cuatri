import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { SpinerService } from 'src/app/servicios/spiner.service';

@Component({
  selector: 'app-bar-cocina',
  templateUrl: './bar-cocina.page.html',
  styleUrls: ['./bar-cocina.page.scss'],
})
export class BarCocinaPage implements OnInit {
  pedidos = [];
  all_pedidos: any;
  all_prod: any;
  all_pedidos_prod: any;
  empleado;

  constructor(
    private pedidosService: PedidosService,
    private productosService: ProductosService,
    private auth: AuthService,
    private spiner:SpinerService
  ) { }

  ngOnInit() {
    this.empleado = this.auth.getUsuario();
    this.tomarPedidos()
  }


  async tomarPedidos() {
    let sp = await this.spiner.GetAllPageSpinner("");
    sp.present();
    this.all_pedidos = []
    this.pedidosService.getPedidos().subscribe(async (pedidos) => {
      this.all_pedidos = []
      this.all_pedidos = pedidos
      this.tomarPedidoProductos()
      sp.dismiss()
    })
  }

  async tomarPedidoProductos() {
    this.all_pedidos_prod = [];
    this.pedidosService.getPedidoProductos().subscribe(async (pedidos) => {
      this.all_pedidos_prod = [];
      this.all_pedidos_prod = pedidos
      this.tomarProductos()
    })
  }

  async tomarProductos() {
    this.all_prod = [];
    this.productosService.getProductos().subscribe(async (productos) => {
      this.all_prod = productos;
      this.validadorPedidosPendientes();
    })
  }

  validadorPedidosPendientes() {
    let pedidos = this.all_pedidos;
    let pedidoproductos = this.all_pedidos_prod;
    let productos = this.all_prod;
    this.pedidos = [];
    pedidos.forEach(p => {
      let pedido:any=false
      pedidoproductos.forEach(pp => {
        if (p['id'] == pp['id_pedido'] && pp['estado'] == 'esperando') {
              console.log(pp)
              console.log(p)
              productos.forEach(prod => {
            if (prod['id'] == pp['id_producto'] && prod['sector'] == this.empleado['perfil']) {
              console.log(prod)

              if(pedido == false){
                pedido = {
                  id: p['id'],
                  comienzo: p['comienzo'].replace('GMT-0300 (hora estándar de Argentina)',''),
                  sector: prod['sector'],
                  productos: [prod],
                  comanda: pp['comanda'],
                  ver_pedido: p,
                  pedido_productos: [pp],
                  cantidad:pp['cantidad']
                }
              }
              else{
                pedido['productos'].push(prod)
                pedido['pedido_productos'].push(pp)
              }
            }
          })
        }
      })
      if(pedido != false){
        this.pedidos.push(pedido)
      }
    });
  }


  AceptarPedido(pedido){
    let aux_pedido = pedido;
    let array_pedidos = [];
    for (const pp of aux_pedido['pedido_productos']) {
      for (const prod of aux_pedido['productos']) {
        if(prod['id'] == pp['id_producto'] && prod['sector'] == this.empleado['perfil']){
          pp['comanda'] = this.empleado['uid'];
          pp['estado'] = 'preparacion'
          array_pedidos.push(pp)
          break;
        }
      }
    }
    pedido['pedido_productos'] = array_pedidos;
    pedido['pedido_productos'].forEach(pedido_prod => {
      this.pedidosService.updatePedidoProducto(pedido_prod['id'],pedido_prod);
    });
    console.log(pedido)
  }

}
