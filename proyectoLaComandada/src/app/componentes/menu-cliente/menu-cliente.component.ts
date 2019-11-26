import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.scss'],
})
export class MenuClienteComponent implements OnInit {

  constructor(private loginservi : LoginService) { 
    this.inicio();
  }

  ionViewWillEnter()
  {
    this.inicio();
  }

  clienteLogeado = {
    nombre : "" ,
    apellido : "" ,
    dni : "" ,
    perfil : "cliente" ,
    correo : "" ,
    foto:"../../assets/usos/user.png",
  }

  async inicio()
  {
    this.loginservi.traerDatosUsuario().subscribe(
      datos =>{
        this.clienteLogeado.nombre = datos["0"]["nombre"];
        this.clienteLogeado.apellido = datos["0"]["apellido"];
        this.clienteLogeado.foto = datos["0"]["foto"];
      }
    )
  }

  ngOnInit() {}

  cerrarSesion()
  {
    this.loginservi.cerrarSesion();
  }

}
