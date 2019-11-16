export class ClienteEspera {
    id: string;
    email: string;
    idAuth: string;

    constructor(idP: string, emialP: string, idAuthP: string) {
        this.id = idP;
        this.email = emialP;
        this.idAuth = idAuthP;
    }
}