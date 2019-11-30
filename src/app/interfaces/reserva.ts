export interface Reserva {
    id: string;
    idMesa: string;
    idCliente: string;
    fecha: Date;
    estado: string; // 'pendiente', 'confirmada', 'expirada'
}

export interface Espera {
    id:string;
    nombre:string;
    cantidad:string;
    ingreso:string;
    cliente:string;
}
