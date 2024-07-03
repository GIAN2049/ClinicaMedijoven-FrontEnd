import { Usuario } from "./usuario";

export interface Paciente{
    id? : number;
    usuario? : Usuario[];
    tipoSangre? : number;
	disponible? : number;
}