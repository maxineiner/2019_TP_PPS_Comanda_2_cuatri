import { Component, OnInit } from '@angular/core';
import { Pedido, Producto } from 'src/app/modals/pedido';
import { ToastController } from '@ionic/angular';
import { PedidosClienteService } from 'src/app/servicios/pedidos-cliente.service';

@Component({
  selector: 'app-hacer-pedido-cliente',
  templateUrl: './hacer-pedido-cliente.component.html',
})
export class HacerPedidoClienteComponent implements OnInit {

  menu : boolean = true;
  comidas : boolean;
  bebidas : boolean;
  postres : boolean;

  //El pedido general
  pedido : Pedido;
  //los productos del pedido
  productos : Producto[];

  //para mosrar en el html
  productosComidaLista : Producto[];
  productosBebidaLista : Producto[];
  productosPostreLista : Producto[];

  //Comidas
  hamburguesa : Producto;
  pizza : Producto;
  ensalada : Producto;
  milanesa : Producto;
  sopa : Producto;

  //bebidas
  cocacola : Producto;
  fanta : Producto;
  sprite : Producto;
  agua : Producto;
  manaosUva : Producto;

  //postre
  helado : Producto;
  cheese : Producto;
  milk : Producto;
  torta : Producto;
  flan : Producto;

  constructor(private toastController: ToastController,public pedidoServi : PedidosClienteService){
    this.iniciar();
  }

  ngOnInit(){}

  async iniciar()
  {    
    //comida
    this.hamburguesa = {
      tipo: "comida",
      precioUnitario: 100,
      total: 0,
      tiempo : 20,
      estado : "pendiente",
      nombre : "Hamburguesa",
      imagen: "../../../assets/usos/hamburguesa.png",
      cantidad : 0
    }
    this.ensalada = {
      tipo: "comida",
      precioUnitario: 80,
      total: 0,
      tiempo : 15,
      estado : "pendiente",
      nombre : "Ensalada",
      imagen: "../../../assets/usos/ensalada.png",
      cantidad : 0
    }  
    this.milanesa = {
      precioUnitario:200,
      tipo: "comida",
      total: 0,
      tiempo : 30,
      estado : "pendiente",
      nombre : "Milanesa con papa",
      imagen: "../../../assets/usos/milanesa.png",
      cantidad : 0
    }
    this.pizza = {
      precioUnitario: 220,
      tipo: "comida",
      total: 0,
      tiempo : 40,
      estado : "pendiente",
      nombre : "Pizza",
      imagen: "../../../assets/usos/pizza.png",
      cantidad : 0
    }
    this.sopa = {
      tipo: "comida",
      precioUnitario: 70,
      total: 0,
      tiempo : 25,
      estado : "pendiente",
      nombre : "Sopa de verduras",
      imagen: "../../../assets/usos/sopa.png",
      cantidad : 0
    }

    //bebida
    this.cocacola = {
      tipo: "bebida",
      precioUnitario: 40,
      total: 0,
      tiempo : 0,
      estado : "pendiente",
      nombre : "Coca-cola",
      imagen: "../../../assets/usos/cocacola.png",
      cantidad : 0
    }
    this.sprite = {
      tipo: "bebida",
      precioUnitario: 40,
      total: 0,
      tiempo : 0,
      estado : "pendiente",
      nombre : "Sprite",
      imagen: "../../../assets/usos/sprite.png",
      cantidad : 0
    }
    this.agua = {
      tipo: "bebida",
      precioUnitario: 30,
      total: 0,
      tiempo : 0,
      estado : "pendiente",
      nombre : "Agua Mineral",
      imagen: "../../../assets/usos/agua.png",
      cantidad : 0
    }
    this.manaosUva = {
      tipo: "bebida",
      precioUnitario: 50,
      total: 0,
      tiempo : 0,
      estado : "pendiente",
      nombre : "Manaos de Uva",
      imagen: "../../../assets/usos/manaos.jpg",
      cantidad : 0
    }
    this.fanta = {
      tipo: "bebida",
      precioUnitario: 30,
      total: 0,
      tiempo : 0,
      estado : "pendiente",
      nombre : "Fanta",
      imagen: "../../../assets/usos/fanta.png",
      cantidad : 0
    }
    //postre
    this.helado = {
      tipo: "postre",
      precioUnitario: 50,
      total: 0,
      tiempo : 10,
      estado : "pendiente",
      nombre : "Helado",
      imagen: "../../../assets/usos/helado.png",
      cantidad : 0
    }

    this.milk = {
      tipo: "postre",
      precioUnitario: 50,
      total: 0,
      tiempo : 15,
      estado : "pendiente",
      nombre : "MilkShake",
      imagen: "../../../assets/usos/milkshake.png",
      cantidad : 0
    }
    
    this.flan = {
      tipo: "postre",
      precioUnitario: 50,
      total: 0,
      tiempo : 20,
      estado : "pendiente",
      nombre : "Flan",
      imagen: "../../../assets/usos/flan.png",
      cantidad : 0
    }

    this.torta = {
      tipo: "postre",
      precioUnitario: 55,
      total: 0,
      tiempo : 10,
      estado : "pendiente",
      nombre : "Torta",
      imagen: "../../../assets/usos/torta.jpg",
      cantidad : 0
    }

    this.cheese = {
      tipo: "postre",
      precioUnitario: 55,
      total: 0,
      tiempo : 10,
      estado : "pendiente",
      nombre : "Cheese cake",
      imagen: "../../../assets/usos/cheesecake.jpg",
      cantidad : 0
    }

    this.productos = [];

    this.pedido = {
      estadoChef: "",
      estadoBarman: "",
      estadoPedido: "pendiente",
      mesa: "2",
      total: 0,
      productos : this.productos,
    };
   
    this.productosComidaLista = [];
    this.productosBebidaLista = [];
    this.productosPostreLista = [];

    await this.productosPostreLista.push(this.helado,this.torta,this.milk,this.cheese,this.flan);
    await this.productosBebidaLista.push(this.cocacola,this.sprite,this.fanta,this.agua,this.manaosUva);
    await this.productosComidaLista.push(this.hamburguesa,this.ensalada,this.pizza,this.sopa,this.milanesa);
  }

  async mensaje(texto)
  {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2500,
      position:"top",
      color : "light",
      buttons: [{
          text: 'x',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    toast.present();
  }
  
  agregarProductoComida(comida,cantidad)
  {
    switch (comida) {
      case 'Hamburguesa':
        if(this.pedido.productos.includes(this.hamburguesa))
        {
          if(cantidad == "+")
          {
            this.hamburguesa.cantidad++;
          }
          else
          {
            if(this.hamburguesa.cantidad > 0)
            {
              this.hamburguesa.cantidad--;
              if(this.hamburguesa.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Hamburguesa';});
              }
            }
            else{
              if(this.hamburguesa.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Hamburguesa';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != '-')
          {   
            this.hamburguesa.cantidad++;
            this.pedido.productos.push(this.hamburguesa);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.hamburguesa.total = this.hamburguesa.cantidad * this.hamburguesa.precioUnitario;
        break;

      case 'Sopa de verduras':
        if(this.pedido.productos.includes(this.sopa))
        {
          if(cantidad == "+")
          {
            this.sopa.cantidad++;
          }
          else
          {
            if(this.sopa.cantidad > 0)
            {
              this.sopa.cantidad--;
              if(this.sopa.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Sopa de verduras';});
              }
            }
            else{
              if(this.sopa.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Sopa de verduras';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != '-')
          {
            this.sopa.cantidad++;
            this.pedido.productos.push(this.sopa);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.sopa.total = this.sopa.cantidad * this.sopa.precioUnitario;
        break;
      case 'Pizza':
        if(this.pedido.productos.includes(this.pizza))
        {
          if(cantidad == "+")
          {
            this.pizza.cantidad++;
          }
          else
          {
            if(this.pizza.cantidad > 0)
            {
              this.pizza.cantidad--;
              if(this.pizza.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Pizza';});
              }
            }
            else{
              if(this.pizza.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Pizza';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != '-')
          {
            this.pizza.cantidad++;
            this.pedido.productos.push(this.pizza);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.pizza.total = this.pizza.cantidad * this.pizza.precioUnitario;
        break;
      case 'Milanesa con papa':
        if(this.pedido.productos.includes(this.milanesa))
        {
          if(cantidad == "+")
          {
            this.milanesa.cantidad++;
          }
          else
          {
            if(this.milanesa.cantidad > 0)
            {
              this.milanesa.cantidad--;
              if(this.milanesa.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Milanesa con papa';});
              }
            }
            else{
              if(this.milanesa.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Milanesa con papa';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != '-')
          {
            this.milanesa.cantidad++;
            this.pedido.productos.push(this.milanesa);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.milanesa.total = this.milanesa.cantidad * this.milanesa.precioUnitario;
        break;
      case 'Ensalada':
        if(this.pedido.productos.includes(this.ensalada))
        {
          if(cantidad == "+")
          {
            this.ensalada.cantidad++;
          }
          else
          {
            if(this.ensalada.cantidad > 0)
            {
              this.ensalada.cantidad--;
              if(this.ensalada.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Ensalada';});
              }
            }
            else{
              if(this.ensalada.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Ensalada';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != "-")
          {
            this.ensalada.cantidad++;
            this.pedido.productos.push(this.ensalada);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.ensalada.total = this.ensalada.cantidad * this.ensalada.precioUnitario;
        break;
      default:
        break;
    }

    this.actualizarTotal();
    console.log(this.pedido.productos);
  }

  agregarProductoBebida(comida,cantidad)
  {
    switch (comida) {
      case 'Coca-cola':
        if(this.pedido.productos.includes(this.cocacola))
        {
          if(cantidad == "+")
          {
            this.cocacola.cantidad++;
          }
          else
          {
            if(this.cocacola.cantidad > 0)
            {
              this.cocacola.cantidad--;
              if(this.cocacola.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Coca-cola';});
              }
            }
            else{
              if(this.cocacola.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Coca-cola';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != '-')
          {   
            this.cocacola.cantidad++;
            this.pedido.productos.push(this.cocacola);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.cocacola.total = this.cocacola.cantidad * this.cocacola.precioUnitario;
        break;

      case 'Sprite':
        if(this.pedido.productos.includes(this.sprite))
        {
          if(cantidad == "+")
          {
            this.sprite.cantidad++;
          }
          else
          {
            if(this.sprite.cantidad > 0)
            {
              this.sprite.cantidad--;
              if(this.sprite.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Sprite';});
              }
            }
            else{
              if(this.sprite.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Sprite';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != '-')
          {
            this.sprite.cantidad++;
            this.pedido.productos.push(this.sprite);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.sprite.total = this.sprite.cantidad * this.sprite.precioUnitario;
        break;
      case 'Fanta':
        if(this.pedido.productos.includes(this.fanta))
        {
          if(cantidad == "+")
          {
            this.fanta.cantidad++;
          }
          else
          {
            if(this.fanta.cantidad > 0)
            {
              this.fanta.cantidad--;
              if(this.fanta.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Fanta';});
              }
            }
            else{
              if(this.fanta.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Fanta';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != '-')
          {
            this.fanta.cantidad++;
            this.pedido.productos.push(this.fanta);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.fanta.total = this.fanta.cantidad * this.fanta.precioUnitario;
        break;
      case 'Manaos de Uva':
        if(this.pedido.productos.includes(this.manaosUva))
        {
          if(cantidad == "+")
          {
            this.manaosUva.cantidad++;
          }
          else
          {
            if(this.manaosUva.cantidad > 0)
            {
              this.manaosUva.cantidad--;
              if(this.manaosUva.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Manaos de Uva';});
              }
            }
            else{
              if(this.manaosUva.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Manaos de Uva';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != '-')
          {
            this.manaosUva.cantidad++;
            this.pedido.productos.push(this.manaosUva);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.manaosUva.total = this.manaosUva.cantidad * this.manaosUva.precioUnitario;
        break;
      case 'Agua Mineral':
        if(this.pedido.productos.includes(this.agua))
        {
          if(cantidad == "+")
          {
            this.agua.cantidad++;
          }
          else
          {
            if(this.agua.cantidad > 0)
            {
              this.agua.cantidad--;
              if(this.agua.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Agua Mineral';});
              }
            }
            else{
              if(this.agua.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Agua Mineral';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != "-")
          {
            this.agua.cantidad++;
            this.pedido.productos.push(this.agua);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.agua.total = this.agua.cantidad * this.agua.precioUnitario;
        break;
      default:
        break;
    }

    this.actualizarTotal();
    console.log(this.pedido.productos);
  }

  agregarProductoPostre(comida,cantidad)
  {
    switch (comida) {
      case 'Helado':
        if(this.pedido.productos.includes(this.helado))
        {
          if(cantidad == "+")
          {
            this.helado.cantidad++;
          }
          else
          {
            if(this.helado.cantidad > 0)
            {
              this.helado.cantidad--;
              if(this.helado.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Helado';});
              }
            }
            else{
              if(this.helado.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Helado';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != '-')
          {   
            this.helado.cantidad++;
            this.pedido.productos.push(this.helado);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.helado.total = this.helado.cantidad * this.helado.precioUnitario;
        break;

      case 'MilkShake':
        if(this.pedido.productos.includes(this.milk))
        {
          if(cantidad == "+")
          {
            this.milk.cantidad++;
          }
          else
          {
            if(this.milk.cantidad > 0)
            {
              this.milk.cantidad--;
              if(this.milk.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'MilkShake';});
              }
            }
            else{
              if(this.milk.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'MilkShake';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != '-')
          {
            this.milk.cantidad++;
            this.pedido.productos.push(this.milk);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.milk.total = this.milk.cantidad * this.milk.precioUnitario;
        break;
      case 'Flan':
        if(this.pedido.productos.includes(this.flan))
        {
          if(cantidad == "+")
          {
            this.flan.cantidad++;
          }
          else
          {
            if(this.flan.cantidad > 0)
            {
              this.flan.cantidad--;
              if(this.flan.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Flan';});
              }
            }
            else{
              if(this.flan.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Flan';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != '-')
          {
            this.flan.cantidad++;
            this.pedido.productos.push(this.flan);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.flan.total = this.flan.cantidad * this.flan.precioUnitario;
        break;
      case 'Torta':
        if(this.pedido.productos.includes(this.torta))
        {
          if(cantidad == "+")
          {
            this.torta.cantidad++;
          }
          else
          {
            if(this.torta.cantidad > 0)
            {
              this.torta.cantidad--;
              if(this.torta.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Torta';});
              }
            }
            else{
              if(this.torta.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Torta';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != '-')
          {
            this.torta.cantidad++;
            this.pedido.productos.push(this.torta);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.torta.total = this.torta.cantidad * this.torta.precioUnitario;
        break;
      case 'Cheese cake':
        if(this.pedido.productos.includes(this.cheese))
        {
          if(cantidad == "+")
          {
            this.cheese.cantidad++;
          }
          else
          {
            if(this.cheese.cantidad > 0)
            {
              this.cheese.cantidad--;
              if(this.cheese.cantidad == 0)
              {
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Cheese cake';});
              }
            }
            else{
              if(this.cheese.cantidad == 0)
              {
                console.log("Borrar verdura");
                this.pedido.productos = this.pedido.productos.filter(elemento=>{ return elemento.nombre != 'Cheese cake';});
              }
              else
              {
                this.mensaje("No puede pedir menos de 0");
              }
            }
          }
        }
        else
        {
          if(cantidad != "-")
          {
            this.cheese.cantidad++;
            this.pedido.productos.push(this.cheese);
          }
          else
          {
            this.mensaje("No puede pedir menos de 0");
          }
        }
        this.cheese.total = this.cheese.cantidad * this.cheese.precioUnitario;
        break;
      default:
        break;
    }

    this.actualizarTotal();
    console.log(this.pedido.productos);
  }

  actualizarTotal()
  {
    let totalPedido : number = 0;
    this.pedido.productos.forEach(elemento =>{totalPedido = totalPedido + elemento.total});
    this.pedido.total = totalPedido;
    console.log("total: " + this.pedido.total);
  }

  altaPedido()
  {
    this.pedidoServi.agregarPedido(this.pedido);
    this.mensaje("Se envio tu pedido al mozo con exito!");
  }

  opcionMenu(menu)
  {
    switch (menu) {
      case 'bebidas':
        this.bebidas = true;
        this.comidas = false;
        this.menu = false;
        this.postres = false;
        break;
      case 'comidas':
        this.bebidas = false;
        this.comidas = true;
        this.menu = false;
        this.postres = false;
        break;
      case 'postres':
        this.bebidas = false;
        this.comidas = false;
        this.menu = false;
        this.postres = true;
        break;
      
      default:
          this.bebidas = false;
          this.comidas = false;
          this.menu = true;
          this.postres = false;
        break;
    }
  }

}
