import { PreguntaRespuesta } from './preguntaRespuesta';

export class EncuestaRespuesta {
    preguntaRespuesta: PreguntaRespuesta[] = [];

    constructor(preguntaRespuestaParam: PreguntaRespuesta[]) {
      this.preguntaRespuesta = preguntaRespuestaParam;
    }
  }