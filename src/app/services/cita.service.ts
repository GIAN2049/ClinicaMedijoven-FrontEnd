import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private http:HttpClient) { }

  getCita(){

    return this.http.get<any>(`${environment.url}/citasMedicos`)

  }

  getMedicos(){

    return this.http.get<any>(`${environment.url}/medicos`)

  }

  getPacientes(){

    return this.http.get<any>(`${environment.url}/pacientes`)

  }


  newCita(cita:any){

    return this.http.post<any>(`${environment.url}/citasMedicos/registrar`, cita)

  }

  deleteCita(id:number){

    return this.http.delete(`${environment.url}/citasMedicos/eliminar/${id}`)

  }

  updateCita(cita:any){

    return this.http.put(`${environment.url}/citasMedicos/actualizar`, cita)

  }

}
