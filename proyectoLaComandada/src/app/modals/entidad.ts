export class Entidad {
    constructor(public nombre : string,
         public apellido : string,
          public dni : string, 
          public cuit : string, 
          public perfil : string, 
          public foto : string,
          public correo : string,
          public clave : string
          ) {
        
    }
    // nombre : string,
    // apellido : string,
    // dni : string,
    // cuit : string,
    // perfil : string,
    // foto? : string,
    // correo : string,
    // clave : string
}

//por que una interface??? esto serua una clase
//Vi ejemplos en donde muchos usaban una iterface
// esos son re giles, ndeaaa
//jajajaja, pero es mas simple, no tenes que instanciar a cada rato
//foto tiene que ser de tipo string?
// si lo haces en base64 si, ahora lo vemos 