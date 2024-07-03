import { Categoria } from "./Categoria";

export interface Medicamento{
    id? : number;
    nombre? : string;
    stock? : number;
    precio? : number;
    categoria? : Categoria;
}