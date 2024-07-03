import { Especialidad } from "./Especialidad";
import { UsuarioUpdate } from "./UsuarioUpdate";

export interface MedicoUpdate{
    id? : number;
    usuario? : UsuarioUpdate;
    especialidad? : Especialidad;
    disponible? : boolean;
}