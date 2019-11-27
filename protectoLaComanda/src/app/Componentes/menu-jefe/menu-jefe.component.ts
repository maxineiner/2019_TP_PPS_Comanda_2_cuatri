import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-menu-jefe',
  templateUrl: './menu-jefe.component.html',
  styleUrls: ['./menu-jefe.component.scss'],
})
export class MenuJefeComponent implements OnInit {

  
  items = [
    {icono : "people" , nombre : "Clientes pendientes" , ruta : "lista"},
    {icono : "bowtie" , nombre : "Registrar empleado" , ruta  : ""}
  ]
  jefeLogueado = {nombre : "Daniel" , apellido : "Holub" , path : "../../../assets/jefe.png" , perfil : "Supervisor"}
  constructor() {
    
   }

  ngOnInit() {
    
  }

}
