import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
  })
  export class RecetaService {
  
    constructor(private http:HttpClient) { }
  
    listar() {
      return this.http.get<any>(`${environment.url}/receta/listar`)   
    }
  
    getReceta(cod: number) {
      return this.http.get<any>(`${environment.url}/receta/consulta/${cod}`)
    }

    getMedicamentoByIdCategoria(cod:number) {
      return this.http.get<any>(`${environment.url}/receta/medicamento/${cod}`)
    }
  
    save(receta: any) {
      return this.http.post<any>(
        `${environment.url}/receta/grabar`,receta
        
      );
    }
  
    getMedicos(){
      return this.http.get<any>(`${environment.url}/medicos`)
    }
  
    getPacientes(){
      return this.http.get<any>(`${environment.url}/pacientes`)
  
    }
  
    getEspecialidades() {
      return this.http.get<any>(`${environment.url}/Especialidad/listar`)
    }
  
    getCategorias() {
      return this.http.get<any>(`${environment.url}/Categoria/listar`)
    }
  
    getMedicamento() {
      return this.http.get<any>(`${environment.url}/medicamento/listar`)
    }
  

    delete(cod: number) {
      return this.http.delete(`${environment.url}/receta/eliminar/${cod}`)
    }
  
    edit(receta:any) {
      return this.http.put(`${environment.url}/receta/grabar`, receta)
    }

  }