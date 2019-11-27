import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.scss'],
})
export class MenuClienteComponent implements OnInit {

  constructor(private loginservi : LoginService, private rutas : Router) { 
    this.inicio();
  }

  ionViewWillEnter()
  {
    this.inicio();
  }

  items = [
    {icono : "qr-scanner" , nombre : "Pedir mesa" , ruta : "pedir-mesa-cliente"},
  ]
  

  clienteLogeado = {
    nombre : "" ,
    apellido : "" ,
    dni : "" ,
    perfil : "cliente" ,
    correo : "" ,
    foto:"../../assets/usos/user.png",
    mesa:""
  }

  navegar(path)
  {
    this.rutas.navigate(["menu-cliente/" + path])
  }

  async inicio()
  {
    this.loginservi.traerDatosUsuario().subscribe(
      datos =>{
        this.clienteLogeado.nombre = datos["0"]["nombre"];
        this.clienteLogeado.apellido = datos["0"]["apellido"];
        this.clienteLogeado.foto = datos["0"]["foto"];
        this.clienteLogeado.mesa = datos['0']['mesa'];
        if(this.clienteLogeado.mesa == "ninguna" || this.clienteLogeado.mesa == "pendiente" || this.clienteLogeado.mesa == "habilitado")
        {
          this.items = [
            {icono : "qr-scanner" , nombre : "Pedir mesa" , ruta : "pedir-mesa-cliente"},
          ]
        }
        else
        {
          this.items = [
            {icono : "qr-scanner" , nombre : "Pedir mesa" , ruta : "pedir-mesa-cliente"},
            {icono : "restaurant" , nombre : "Hacer pedido" , ruta : "hacer-pedido-cliente"},
          ]
        }
      }
    )


  }

  ngOnInit() {}

  cerrarSesion()
  {
    this.loginservi.cerrarSesion();
  }

}
