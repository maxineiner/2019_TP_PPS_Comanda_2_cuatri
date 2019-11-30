export interface EncuestaCliente {
    idCliente: string;
    nivelSatisfaccion: number;
    amabilidad?: string;
    calidadComida: boolean;
    calidadBebida: boolean;
    atencion: boolean;
    organizacion: boolean;
    salonYAmbiente: boolean;
    recomendacion?: boolean;
    comentarios?: string;
    foto1?: string;
    foto2?: string;
    foto3?: string;
    fecha: Date;
}
