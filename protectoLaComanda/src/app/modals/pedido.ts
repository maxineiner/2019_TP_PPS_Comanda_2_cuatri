

export interface Pedido {
    estadoPedido: string;
    estadoChef: string;
    estadoBarman: string;
    id?: string;
    mesa: string;
    productos: Producto[];
    total: number;
}


export interface Producto {
    cantidad: number;
    estado: string;
    imagen: string;
    nombre: string;
    tiempo: number;
    tipo: string;
    precioUnitario: number;
    total: number;
}
