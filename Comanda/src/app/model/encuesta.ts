export class Encuesta {
    //checkbox: Array<any>;
    radio: string;
    range: number;
    select: string;
    input: string;

    constructor(param2: string, param3: number, param4: string, param5: string) {
        //this.checkbox = param1;
        this.radio = param2;
        this.range = param3;
        this.select = param4;
        this.input = param5;
    }
    
}