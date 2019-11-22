import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { GetProductosService } from 'src/app/services/get-productos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
// import { Imagen } from 'src/app/model/imagenes';
import { Producto } from 'src/app/model/producto';
import { Pedido } from 'src/app/model/pedido';
import { Detalle } from 'src/app/model/detalle';


@Component({
  selector: 'app-hacer-pedido',
  templateUrl: './hacer-pedido.page.html',
  styleUrls: ['./hacer-pedido.page.scss'],
})
export class HacerPedidoPage implements OnInit {

  constructor( private authService:AuthService,
    public router : Router,
    private alertController: AlertController,
    private getProductos:GetProductosService,
    private pedidosService:PedidosService) { }


    arrayProductos = [];
    arrayCarrito = [];
    valorCarrito:number = 0;
    auxPedido:Pedido;
    arrayDetalles:Array<Detalle> = [];
    mostrarForm = false;
    msjError:string = "";


  ngOnInit() {
    this.arrayProductos = [];
    this.arrayCarrito = [];
    this.verLista();
    this.auxPedido = new Pedido(this.authService.currentUserId(),this.arrayDetalles,"PENDIENTE",this.valorCarrito);
  }

  private async verLista() {
    this.getProductos.getProductosBase().subscribe(async (productos) => {
      
      // this.arrayClientes
      this.arrayProductos = [];
      productos.forEach(producto => {
   
        if(producto.name != undefined)
        {
          producto.image = JSON.parse(producto.image);
          this.arrayProductos.push(producto);
        }
        
      });
    
    });
    // console.log(this.arrayProductos);
  }
  cambioCantidad(item:Producto, $event)
  {
    let cantidad = $event.srcElement.value;
    this.agregarACarrito(item,cantidad);

    this.valorCarrito =this.calcularCarrito();
    this.auxPedido.total = this.valorCarrito; 
    console.log(this.arrayDetalles);
    console.log(this.auxPedido);
  }

  agregarACarrito(item:Producto,cantidad)
  {
    let precioXcantidad;
    if(cantidad > 0)
    {
      precioXcantidad = (cantidad * item.precio);
    }
    else {
      precioXcantidad = 0;
    }
    let auxDetalle:Detalle = new Detalle(item.name,item.precio,cantidad,item.type,precioXcantidad);
    let flag=false;
    this.auxPedido.arrayDetalle.forEach(element => {
      if(element.nombre == item.name && element.precio == item.precio)
      {
        flag=true
       element.cantidad = cantidad;
       element.subtotal = precioXcantidad;
      }
    });
    if(!flag)
    {
      // this.arrayCarrito.push(detalle);
      this.auxPedido.arrayDetalle.push(auxDetalle);
      
    }
  }

  calcularCarrito() {
    let total:number = 0;
    this.auxPedido.arrayDetalle.forEach(element => {
      // console.log(element.subtotal);
      total += element.subtotal;
    });
   return total;
  }

  finalizarPedido() {
    this.mostrarForm= true;
    console.log(this.auxPedido.arrayDetalle);
  }
  regresar()
  {
    this.mostrarForm=false;
  }
  aceptar(){
    if(this.valorCarrito > 0)
    {
      this.pedidosService.AddPedidoToBD(this.auxPedido);
    }
    else
    {
      this.msjError = "No tiene productos en su pedido"
    }
    
  }
}
