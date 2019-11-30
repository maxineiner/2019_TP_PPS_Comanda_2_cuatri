export interface Cliente {
    uid: string;
    id?: string;
    foto: string;
    nombre: string;
    apellido: string;
    mail: string;
    dni: string;
    genero?: string;
    nacimiento?: string;
    nacionalidad?: string;
    activo: boolean;
    perfil: string;
}

export interface Empleado {
    uid: string;
    id?: string;
    nombre: string;
    apellido: string;
    dni: string;
    cuil: string;
    foto: string;
    perfil: string;
    mail: string;
    activo: boolean;
}

export interface Anonimo {
    id?: string;
    uid?: string;
    foto: string;
    nombre: string;
    perfil: string;
}
