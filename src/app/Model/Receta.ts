import { Categoria } from "./Categoria"
import { Especialidad } from "./Especialidad"
import { Medicamento } from "./Medicamento"
import { Medico } from "./Medico"
import { Paciente } from "./Paciente"

export interface Receta{
    id ? : number
	medico ? : Medico
	paciente ? : Paciente
	especialidad ? : Especialidad
	categoria ? : Categoria
	medicamento ? : Medicamento
	fechaRegistro ? : Date
    detalles ? : string
}