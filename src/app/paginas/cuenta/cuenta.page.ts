import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../servicios/pedidos.service';
import { ProductosService } from '../../servicios/productos.service';
import { Pedido } from 'src/app/interfaces/pedido';
import { MesasService } from 'src/app/servicios/mesas.service';
import { MesaCliente } from 'src/app/interfaces/mesa-cliente';
import { Mesa } from 'src/app/interfaces/mesa';
import { AuthService } from 'src/app/servicios/auth.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ErrorService } from 'src/app/servicios/error.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/servicios/alert.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SpinerService } from 'src/app/servicios/spiner.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  public id = ''; // mesa cliente actual
  private pedidosproductos: any;
  public pedidos: any;
  private productos: any;
  public productosCuenta = [];
  public total = 0;
  public mesasClientes = [];
  private mesas = [];
  public empleado: any;
  public esMozo = false;
  public propina = 0;
  public bebidaGratis = 0;
  public postreGratis = 0;
  public descPorcentaje = false;
  public descBebida = false;
  public descPostre = false;
  id_usr;
  delivery=false;
  constructor(private pedidosServ: PedidosService, private mesasServ: MesasService,
    private authService: AuthService, private barcodeScanner: BarcodeScanner,
    private errorHand: ErrorService, private router: Router, private alertServ: AlertService,private spiner:SpinerService) {
  }

  ngOnInit() {
    this.empleado = this.authService.getUsuario();
    this.pedidosServ.getPedidos().subscribe((data) => {
      this.pedidos = data;
      console.log('pedidos: ', this.pedidos);
    });
    this.pedidosServ.getPedidosProductos().subscribe((data) => {
      this.pedidosproductos = data;
      console.log('pedidos-productos: ', this.pedidosproductos);
    });
    this.pedidosServ.getProductos().subscribe((data) => {
      this.productos = data;
      console.log('productos: ', this.productos);
    });
    this.mesasServ.getMesas().subscribe((data) => {
      this.mesas = data;
    });
    this.mesasServ.getMesasClientes().subscribe((data) => {
      this.mesasClientes = data;
      console.log('mesas-clientes: ', this.mesasClientes);
      if (this.empleado.perfil !== 'cliente' && this.empleado.perfil !== 'anonimo') {
        this.esMozo = true;
      } else {
        this.total = 0;
        this.esMozo = false;
        this.id_usr = this.empleado['id']
        this.mesasClientes.forEach(m => {
          if (m.idCliente === this.empleado.id && !m.cerrada) {
            this.id = m.id;
            console.log('id-mesa-cliente actual: ', this.id);
          }
        });
        this.CargarCuenta();
      }
    });
  }


  public SolicitarCuenta() {
    this.mesasClientes.forEach(mesa => {
      if (mesa.idCliente === this.empleado.id) {
        this.mesas.forEach(m => {
          if (m.id === mesa.idMesa) {
            m.estado = 'esperando cuenta';
            this.mesasServ.updateMesa(m);
          }
        });
      }
    });
    this.alertServ.mensaje('', 'Cuenta solicitada.');
  }

  public async CargarCuenta() {
    let sp = await this.spiner.GetAllPageSpinner("");
    sp.present();
    this.total = 0;
    this.propina = 0;
    this.descBebida = false;
    this.descPorcentaje = false;
    this.descPostre = false;
    this.productosCuenta = [];
    let auxB = true;
    let auxP = true;
    let auxD = true;
    if (this.id !== '') {
      this.mesasClientes.forEach(m => {
        if (m.id === this.id && !m.cerrada) {
          this.pedidos.forEach(p => {
            // console.log(p.id_mesa_cliente + " - - - - " + m.id)
            if (p.id_mesa_cliente === m.id) {
              this.pedidosproductos.forEach(pp => {
                // console.log(p.id + " - - - - " + pp.id_pedido)
                if (p.id === pp.id_pedido) {
                  this.productos.forEach(prod => {
                    if (prod.id === pp.id_producto) {
                      let proda = prod;
                      proda['cantidad'] = pp.cantidad;
                      // proda.precio = Number.parseInt(prod.precio) * Number.parseInt(pp.cantidad)
                      console.log(proda);
                      let repetido = false;
                      this.productosCuenta.forEach( pc => {
                        if (pc.id === proda.id) {
                          pc.cantidad += pp.cantidad;
                          // pc.precio += Number.parseInt(proda.precio);
                          repetido = true;
                        }
                      });
                      if (!repetido) {
                        this.productosCuenta.push(proda);
                      }
                      console.log(this.productosCuenta);
                      this.propina = m.propina;
                      // descuentos:
                      /*if (auxB && prod.sector == 'bar' && m.juegoBebida > 0) {
                        this.bebidaGratis = prod.precio;
                        this.descBebida = true;
                        this.total -= Number.parseInt(prod.precio);
                        auxB = false;
                      }
                      if (auxP && prod.esPostre && m.juegoPostre > 0) {
                        this.postreGratis = prod.precio;
                        this.descPostre = true;
                        this.total -= Number.parseInt(prod.precio);
                        auxP = false;
                      }*/
                      if (auxD && m.juegoDescuento > 0) {
                        this.descPorcentaje = true;
                        auxD = false;
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });


      console.log(this.productosCuenta);
      this.productosCuenta.forEach( p => {
        let aux = Number.parseInt(p.precio) * Number.parseInt(p.cantidad);
        this.total += aux;
      });

      if (this.descPorcentaje) {
        this.total *= 0.9;
      }

    }
    this.pedidos.forEach(p => {
      // console.log(p.id_mesa_cliente + " - - - - " + m.id)
      if (p.id_mesa_cliente == this.id_usr && p.estado != 'fin') {
        this.pedidosproductos.forEach(pp => {
          // console.log(p.id + " - - - - " + pp.id_pedido)
          if (p.id === pp.id_pedido && p.delivery) {
            this.delivery = true;
            this.id = this.id_usr;
            this.productos.forEach(prod => {
              if (prod.id === pp.id_producto) {
                let proda = prod;
                proda['cantidad'] = pp.cantidad;
                console.log(proda)
                this.productosCuenta.push(proda);
                console.log(this.productosCuenta)
                this.total += Number.parseInt(proda.precio) * Number.parseInt(proda.cantidad);
                this.propina = 1;
                // AGREGAR ALERT PARA MOSTRAR PROPINA AGREGAR
                // descuentos:

              }
            });
          }
        });
      }
    });
    sp.dismiss();


    console.log(this.productosCuenta);



  }
  public Pagada() {
    // console.log(this.pedidoSelecc);
    this.mesasClientes.forEach(mesaCl => {
      if (mesaCl.id === this.id) {
        mesaCl.cerrada = true;
        this.mesasServ.updateMesaCliente(mesaCl);
        // console.log(mesaCl);
        this.mesas.forEach(mesa => {
          if (mesa.id === mesaCl.idMesa) {
            mesa.estado = 'disponible';
            this.mesasServ.updateMesa(mesa);
            // console.log(mesa);
            this.alertServ.mensaje('', 'Se registró el pago.');
            this.router.navigate(['/home-mozo']);
          }
        });
      }
    });
  }
  public Propina() {
    this.barcodeScanner.scan().then(barcodeData => {
      // alert(barcodeData.text);
      if (barcodeData.text === 'malo') {
        this.GuardarPropina(1);
      } else if (barcodeData.text === 'regular') {
        this.propina *= 1.05;
        this.GuardarPropina(1.05);
      } else if (barcodeData.text === 'bien') {
        this.propina *= 1.10;
        this.GuardarPropina(1.10);
      } else if (barcodeData.text === 'muy bien') {
        this.propina *= 1.15;
        this.GuardarPropina(1.15);
      } else if (barcodeData.text === 'excelente') {
        this.propina *= 1.20;
        this.GuardarPropina(1.20);
      } else {
        this.alertServ.mensaje('', 'Código no válido!');
      }
    }).catch(err => {
      this.errorHand.MostrarErrorSoloLower('Error: ' + err);
      console.log('Error', err);
    });
  }
  private GuardarPropina(propina: number) {
    this.propina = propina;
    this.mesasClientes.forEach(mesaCl => {
      if (mesaCl.idCliente === this.empleado.id) {
        mesaCl.propina = propina;
        this.mesasServ.updateMesaCliente(mesaCl);
      }
    });
  }

}
