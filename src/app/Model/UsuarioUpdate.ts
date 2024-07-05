import { Especialidad } from "./Especialidad";
import { Rol } from "./Rol";
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
	roles ? : Rol[]
	sexo? : string
}