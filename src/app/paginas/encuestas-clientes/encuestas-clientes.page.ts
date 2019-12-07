import { Component, OnInit } from '@angular/core';
import { EncuestasService } from 'src/app/servicios/encuestas.service';

@Component({
  selector: 'app-encuestas-clientes',
  templateUrl: './encuestas-clientes.page.html',
  styleUrls: ['./encuestas-clientes.page.scss'],
})
export class EncuestasClientesPage implements OnInit {
  encuestas=[]
  constructor(private encuestaServe:EncuestasService) { }

  ngOnInit() {
    this.encuestaServe.GetEncuestasClientes().then(ret=>{
      ret.forEach(encuesta=>{
        let encuesta_aux = encuesta.data();
        encuesta_aux.recomendacion = encuesta_aux.recomendacion.toString()
        this.encuestas.push(encuesta_aux)
        console.log(this.encuestas)
        
      })
    })
  }

}
