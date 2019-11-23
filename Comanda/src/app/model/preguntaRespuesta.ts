export class PreguntaRespuesta {
    pregunta: string;
    respuesta: string;
    tipo: string | number;

    constructor(preguntaParam: string, respuestaParam: string, tipoParam: string|number) {
        this.pregunta = preguntaParam;
        this.respuesta = respuestaParam;
        this.tipo = tipoParam;
    }
}