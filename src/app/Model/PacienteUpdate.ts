import { UsuarioUpdate } from "./UsuarioUpdate";
import { Usuario } from "./usuario";

export interface PacienteUpdate{
    id? : number;
    usuario? : UsuarioUpdate;
    tipoSangre? : string;
	disponible? : boolean;
}