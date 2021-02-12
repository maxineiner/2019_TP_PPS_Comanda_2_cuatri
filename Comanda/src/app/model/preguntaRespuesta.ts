export class PreguntaRespuesta {
    pregunta: string;
    respuesta: string | any[];
    tipo: string | number;

    constructor(preguntaParam: string, respuestaParam: string|any[], tipoParam: string|number) {
        this.pregunta = preguntaParam;
        this.respuesta = respuestaParam;
        this.tipo = tipoParam;
    }
}