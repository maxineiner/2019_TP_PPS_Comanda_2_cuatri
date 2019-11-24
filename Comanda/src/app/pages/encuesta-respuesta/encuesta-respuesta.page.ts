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

  public chartType = 'doughnut';
  encuestasRespuestas: EncuestaRespuesta[];
  encuestaRespuestas = [];
  chartLables = [];
  chartData = [];
  tipo: string;

  constructor(private encuestaService: EncuestaService) { }

  ngOnInit() {
    this.encuestaService.getEncuestasResult().subscribe(tables => {
      this.encuestasRespuestas = tables.map(item => {
        return {
          ...item.payload.doc.data()
        } as EncuestaRespuesta;
      });
      let concat = [];
      this.encuestasRespuestas.forEach(er => {
        concat = concat.concat(er.preguntaRespuesta);
      });

      this.groupRespuestasAndGenerateObj(concat);
    })
  }

  groupRespuestasAndGenerateObj(concat) {
    let arrayAux: any[] = [];    
    const group = groupBy(concat, 'pregunta', 'tipo');
    Object.entries(group).forEach(([key, value]) => {
      Object.entries(value).forEach(([keyChild, reqResp]) => {
        this.generateChartData(keyChild, reqResp, arrayAux);
      });
      this.chartData = arrayAux;
      this.encuestaRespuestas.push({ pregunta: key, chartLables: this.chartLables, chartData: this.chartData, tipo: this.tipo});
      this.chartLables = [];
      this.chartData = [];
      arrayAux = [];
    });
  }

  private generateChartData(keyChild: string, reqResp: any, arrayAux: any[]) {
    if (keyChild == '0') {
      this.chartLables = reqResp['opciones'];
      this.tipo = reqResp['tipo'];
      this.chartLables.forEach(c => {
        arrayAux.push(0);
      });
    }
    if (reqResp['tipo'] === 'checkbox') {
      reqResp['respuesta'].forEach(element => {
        let index = this.chartLables.indexOf(element);
        this.generateArrayAux(arrayAux, index);
      });
    } else {
      let index = this.chartLables.indexOf(reqResp['respuesta']);
      this.generateArrayAux(arrayAux, index);
    }
  }

  private generateArrayAux(arrayAux: any[], index: number) {
    for (let i = 0; i < arrayAux.length; i++) {
      if (index == i) {
        arrayAux[i] = arrayAux[i] + 1;
      }
    }
  }
}
