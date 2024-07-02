import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategory(){

    return this.http.get<any>(`${environment.url}apiClinicaV1/Categoria/listar`)

  }

  newCategory(category:any){

    return this.http.post<any>(`${environment.url}apiClinicaV1/Categoria/registrar`, category)

  }

  updateCategory(category:any){

    return this.http.put(`${environment.url}apiClinicaV1/Categoria/actualizar`, category)

  }

  deleteCategory(id:number){

    return this.http.delete(`${environment.url}apiClinicaV1/Categoria/eliminar/${id}`)

  }
}
