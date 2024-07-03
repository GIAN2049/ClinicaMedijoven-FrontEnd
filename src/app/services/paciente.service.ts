import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  constructor(private http: HttpClient) {}

  getPacientes() {
    return this.http.get<any>(`${environment.url}/pacientes`);
  }

  registrarPacientes(paciente: any) {
    return this.http.post<any>(
      `${environment.url}/pacientes`,paciente
      
    );
  }

  actualizarPacientes(paciente: any) {
    return this.http.put(`${environment.url}/pacientes/actualizar`, paciente);
  }

  eliminarPacientes(id: number) {
    return this.http.delete(`${environment.url}/pacientes/${id}`);
  }
}
