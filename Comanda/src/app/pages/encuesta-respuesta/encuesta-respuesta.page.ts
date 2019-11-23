import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { EncuestaRespuesta } from 'src/app/model/encuestaRespuesta';
const groupBy = require('group-by');

@Component({
  selector: 'app-encuesta-respuesta',
  templateUrl: './encuesta-respuesta.page.html',
  styleUrls: ['./encuesta-respuesta.page.scss'],
})
export class EncuestaRespuestaPage implements OnInit {

  doughnut: [{
    chartLabels: [],
    chartData: [],
    chartType: 'doughnut'
  }];

  public chartLabelsCheckBox = ['Iluminación', 'Limpieza', 'Servicio de espera'];
  public chartLabelsRadio = ['Muy satisfecho', 'Poco satisfecho', 'Nada satisfecho'];
  public chartLabelsRange = ['1','2','3','4','5'];
  public chartLabelsSelect = ['SI','NO'];
  public chartData = [120, 150, 180, 90];
  public chartType = 'doughnut';

  preguntas = [
    { pregunta: '1- De las siguientes opciones ¿cuales mejoraria?', tipo: 'checkbox', options: ['Iluminación', 'Limpieza', 'Servicio de espera']},
    { pregunta: '2- ¿Cuan satisfecho quedo con el servicio brindado?', tipo: 'radio',  options: ['Muy satisfecho', 'Poco satisfecho', 'Nada satisfecho']},
    { pregunta: '3- Del 1 al 10 ¿cual es la posibilidad de que nos recomiende?', tipo: 'range', options: ['1','2','3','4','5']},
    { pregunta: '4- ¿Quedo conforme con la variedad del menu?', tipo: 'select', options: ['SI','NO']},
    { pregunta: '5- ¿Que mejoraria, agregaria o quitaria al lugar?', tipo: 'input'}
  ];
  encuestasRespuestas: EncuestaRespuesta[];

  encuestaRespuestas = [];
  opciones = [];

  constructor(private encuestaService: EncuestaService) { }

  ngOnInit() {
    this.encuestaService.getEncuestasResult().subscribe(tables => {
      this.encuestasRespuestas = tables.map(item => {
        return {
          ...item.payload.doc.data()
        } as EncuestaRespuesta;
      });
      let final = [];
      this.encuestasRespuestas.forEach(er => {
        final = final.concat(er.preguntaRespuesta);        
      });

      const group = groupBy(final, 'pregunta', 'tipo');

      console.log(group)

      Object.entries(group).forEach(([key, value]) => {
        Object.entries(value).forEach(([key2, preguntaRespuesta]) => {
          this.opciones.push(preguntaRespuesta['tipo']);
          //console.log(preguntaRespuesta['tipo'])
        });
        this.encuestaRespuestas.push({pregunta: key, options: this.opciones});
      });

      //console.log(this.encuestaRespuestas);

    })
  }

  /*generateArrayObjects(obj: string) {
    Object.entries(obj).forEach(([keyService, value]) => {
      Object.entries(value).forEach(([keyMotivo, value]) => {
        this.jsonMotivos.push({motivo: keyMotivo, pieces: value});
        let index = this.jsonServicios.findIndex(elem => elem.service === keyService);
        index === -1 ? this.jsonServicios.push({service: keyService, motivos: this.jsonMotivos}) :
          this.jsonServicios[index].motivos = this.jsonMotivos;
      });
      this.jsonMotivos = [];
    });
  }*/

  groupRespuestas() {

  }

}
