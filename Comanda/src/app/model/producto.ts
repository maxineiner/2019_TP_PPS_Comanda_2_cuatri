import { Imagen } from './imagenes';

export class Producto {
    name: string;
    descripcion: string;
    tiempo: number;
    precio: number;
    image: string;
    type: string;
    qr:string;

    constructor(paramName: string, descripcion: string, tiempo: number, precio:number, arrayImages:string, type:string) {
        this.name = paramName;
        this.descripcion = descripcion;
        this.tiempo = tiempo;
        this.precio = precio;
         this.image = arrayImages;
         this.type = type;
    }
}