import { Detalle } from './detalle';


export class Pedido {
    id?: string;
    idAuth:string;
    arrayDetalle:Array<Detalle>;
    estado:string;
    total:number; 
    totalPropina:number; //precio final con propina incluida

    numeroMesa: number;//no se persiste en la base
    propina:number; //porcentaje de propina a aplicar

    constructor(idAuth: string,arrayDetalle:Array<Detalle>,estado:string,total:number) {
        this.idAuth= idAuth;
        this.arrayDetalle = arrayDetalle;
        this.estado= estado;
        this.total = total;
    }
}
