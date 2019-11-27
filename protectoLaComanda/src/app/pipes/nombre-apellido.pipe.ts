import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreApellido'
})
export class NombreApellidoPipe implements PipeTransform {

  transform(dato: string , value2? : any , value3?:any): any {
    for(let i = 0 ; i<dato.length ; i++){
      if(dato[i] == " "){
        
        dato = dato[0].toUpperCase() + dato.substr(1,i).toLowerCase() + dato[i+1].toUpperCase() + dato.substr(i+2,dato.length-1).toLowerCase();
        break;
      }
      else{
        dato = dato.charAt(0).toUpperCase() + dato.slice(1).toLocaleLowerCase();
      }
    }
    return dato;
  }

}
