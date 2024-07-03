import { Especialidad } from "./Especialidad";
import { Usuario } from "./usuario";

export interface UsuarioUpdate{
    id? : number
	nombre? : string
	apellidos? : string
	dni? : string
	correo? : string
	telefono? : string
	login? : string
	password? : string
	sexo? : string
}