import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservasService } from 'src/app/servicios/reservas.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-home-metre',
  templateUrl: './home-metre.page.html',
  styleUrls: ['./home-metre.page.scss'],
})
export class HomeMetrePage implements OnInit {

  lista_espera;
  constructor(private reservasService: ReservasService, private authService: AuthService, private route:Router) { }

  ngOnInit() {
    this.reservasService.getListaEspera().subscribe(reservas=>{
      this.lista_espera = reservas;
    })
  }

  Eliminar(id){
    this.reservasService.EliminarListaEspera(id);
  }

  AltaCliente(){
    this.route.navigate(['alta-cliente'])
  }

}
