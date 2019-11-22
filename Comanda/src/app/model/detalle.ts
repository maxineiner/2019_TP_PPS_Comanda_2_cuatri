export class Detalle {
    nombre:string;
    precio:number;
    cantidad:number;
    type:string;
    subtotal:number;

    constructor(nombre,precio,cantidad,type,subtotal) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.type = type;
        this.subtotal = subtotal;
    }
}
