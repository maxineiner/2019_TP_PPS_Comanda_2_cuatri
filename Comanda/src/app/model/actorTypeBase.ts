export class ActorTypeBase {
    name: string;
    lastName: string;
    dni: string;
    cuil: string;
    image: string;
    type: string;

    constructor(paramName: string, paramLastName: string, paramDni: string, paramCuil: string, paramImg: string, paramType: string) {
        this.name = paramName;
        this.lastName = paramLastName;
        this.dni = paramDni;
        this.cuil = paramCuil;
        this.image = paramImg;
        this.type = paramType;
    }
}
