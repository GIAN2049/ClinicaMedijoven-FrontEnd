import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  getUsuarios() {
    return this.http.get<any>(`${environment.url}/usuarios`);
  }

  addUsuarios(usuario: any) {
    return this.http.post<any>(
      `${environment.url}/usuarios`,usuario);
  }

  updateUsuarios(medico: any) {
    return this.http.put(`${environment.url}/usuarios/actualizar`, medico);
  }

  deleteUsuarios(id: number) {
    return this.http.delete(`${environment.url}/usuarios/${id}`);
  }
}