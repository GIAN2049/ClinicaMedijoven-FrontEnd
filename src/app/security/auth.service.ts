import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginUsuario } from "./LoginUsuario";
import { Observable } from "rxjs";
import { JwtDTO } from "./jwt-dto";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'  
})

export class AuthService {

    constructor(private httClient : HttpClient){}

    public login(loginUsuario: LoginUsuario): Observable<JwtDTO>{
        return this.httClient.post<JwtDTO>(`${environment.url}/auth/login`, loginUsuario);
    }
}