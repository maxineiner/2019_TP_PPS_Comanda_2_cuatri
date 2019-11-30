export class Table {
    id?: string;
    number: string;
    capacity: number;
    type: TableType;
    image: string;
    available: boolean;
    idAuth: string;

    constructor(idAuth: string, number: string, capacity: number, type: TableType, image: string, available: boolean) {
        this.idAuth = idAuth;
        this.number = number;
        this.capacity = capacity;
        this.type = type;
        this.image = image;
        this.available = available;
    }
}

export enum TableType {
    Normal = 1,
    Discapacitados = 2,
    VIP = 3
}
