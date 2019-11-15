export class Cliente {
    email:string;
    name: string;
    lastName: string;
    dni: string;
    cuil: string;
    image: string;
    type: string;
    estado:string;
    password:string;

    constructor(email:string, paramName: string, paramLastName: string, 
        paramDni: string, paramImg: string, paramType: string,estado:string, pass:string) {
        this.email = email;
        this.name = paramName;
        this.lastName = paramLastName;
        this.dni = paramDni;
        this.image = paramImg;
        this.type = paramType;
        this.estado = estado;
        this.password = pass;
    }
}
