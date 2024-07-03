import { Especialidad } from "./Especialidad";
import { Usuario } from "./usuario";

export interface Medico{
    id? : number;
    usuario? : Usuario;
    especialidad? : Especialidad;
    disponible? : boolean;
}