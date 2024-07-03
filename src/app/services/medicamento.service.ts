import { HttpClient } from "@angular/common/http"
import { environment } from "../../environments/environment.development"
import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class MedicamentoService{
    constructor(private http: HttpClient) { }

    getMedicamento() {
        return this.http.get<any>(`${environment.url}/medicamento/listar`)
    }

    newMedicamento(medicamento: any) {
        return this.http.post<any>(`${environment.url}/medicamento/grabar`, medicamento)
    }

    updateMedicamento(medicamento: any) {
        return this.http.put(`${environment.url}/medicamento/actualizar`, medicamento)
    }

    deleteMedicamento(id: number) {
        return this.http.delete(`${environment.url}/medicamento/eliminar/${id}`)
    }
}