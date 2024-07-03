import { Rol } from "./Rol"

export interface Usuario{
  	id? : number
	nombre? : string
	apellidos? : string
	dni? : string
	correo? : string
	telefono? : string
	login? : string
	password? : string
	roles? : Rol[]
	sexo? : string
}