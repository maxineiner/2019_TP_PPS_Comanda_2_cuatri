export class Table {
    number: number;
    capacity: number;
    type: TableType;
    image: string;

    constructor(number: number, capacity: number, type: TableType, image: string) {
        this.number = number;
        this.capacity = capacity;
        this.type = type;
        this.image = image;
    }
}

export enum TableType {
    Normal = 1,
    Discapacitados = 2,
    VIP = 3
}
