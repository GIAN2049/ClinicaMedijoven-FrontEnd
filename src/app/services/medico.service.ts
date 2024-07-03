import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private http: HttpClient) {}

  getMedico() {
    return this.http.get<any>(`${environment.url}/medicos`);
  }

  registrarMedico(medico: any) {
    return this.http.post<any>(
      `${environment.url}/medicos`,medico
      
    );
  }

  actualizarMedico(medico: any) {
    return this.http.put(`${environment.url}/medicos/actualizar`, medico);
  }

  eliminarMedico(id: number) {
    return this.http.delete(`${environment.url}/medicos/${id}`);
  }
}
