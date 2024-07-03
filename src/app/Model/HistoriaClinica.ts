import { Paciente } from "./Paciente";

export interface HistoriaClininca{
    id?: number
	paciente?: Paciente
	fechaRegistro? : Date
	diagnostico? : string 
    tratamientos? : string
    resultadosPruebas? : string
}