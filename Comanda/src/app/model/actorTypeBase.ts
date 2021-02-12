export class ActorTypeBase {
    name: string;
    lastName: string;
    dni: string;
    cuil: string;
    image: string;
    type: string;
    emial: string;
    password: string;

    constructor(paramName: string, paramLastName: string, paramDni: string,
                 paramCuil: string, paramImg: string, paramType: string,
                 paramEmial: string, parmaPassword: string) {
        this.name = paramName;
        this.lastName = paramLastName;
        this.dni = paramDni;
        this.cuil = paramCuil;
        this.image = paramImg;
        this.type = paramType;
        this.emial = paramEmial;
        this.password = parmaPassword;
    }
}
