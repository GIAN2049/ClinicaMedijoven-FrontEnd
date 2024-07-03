import { HttpClient } from "@angular/common/http"
import { environment } from "../../environments/environment.development"
import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class HistoriaClinicaService{
    constructor(private http: HttpClient) { }

    obtenerTodos() {
        return this.http.get<any>(`${environment.url}/historiaClinica/listar`)
    }

    registrar(medicamento: any) {
        return this.http.post<any>(`${environment.url}/historiaClinica/registrar`, medicamento)
    }

    actualizar(medicamento: any) {
        return this.http.put(`${environment.url}/historiaClinica/actualizar`, medicamento)
    }

    eliminar(id: number) {
        return this.http.delete(`${environment.url}/historiaClinica/eliminar/${id}`)
    }
}