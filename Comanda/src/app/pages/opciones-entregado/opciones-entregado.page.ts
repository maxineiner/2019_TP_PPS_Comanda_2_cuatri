import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-opciones-entregado',
  templateUrl: './opciones-entregado.page.html',
  styleUrls: ['./opciones-entregado.page.scss'],
})
export class OpcionesEntregadoPage implements OnInit {

  constructor( public router : Router) { }

  ngOnInit() {
  }
  
  goTo(route, param){
    if(param)
      this.router.navigate([route], { queryParams: {tipo: param}});
    else
      this.router.navigate([route]);
  }
}
