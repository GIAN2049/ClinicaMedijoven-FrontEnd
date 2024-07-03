import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private http:HttpClient) { }

  getEspecialidad(){

    return this.http.get<any>(`${environment.url}/Especialidad/listar`)

  }

  newEspecialidad(especialidad:any){

    return this.http.post<any>(`${environment.url}/Especialidad/registrar`, especialidad)

  }

  updateEspecialidad(especialidad:any){

    return this.http.put(`${environment.url}/Especialidad/actualizar`, especialidad)

  }

  deleteEspecialidad(id:number){

    return this.http.delete(`${environment.url}/Especialidad/eliminar/${id}`)

  }
}
