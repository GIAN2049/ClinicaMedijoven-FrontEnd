import { Injectable } from "@angular/core";
import { Menu } from "./Menu";

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
const NAME_KEY = 'AuthName';
const USER_ID_KEY = 'AuthUserId';
const MENUS_KEY = 'Menus';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    roles: Array<string> = [];
    menus: Array<Menu> = [];

    constructor(){}

    public setToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
      }
    
      public getToken(): any {
        return sessionStorage.getItem(TOKEN_KEY) ;
      }
    
      public setUserId(name: any): void {
        window.sessionStorage.removeItem(USER_ID_KEY);
        window.sessionStorage.setItem(USER_ID_KEY, name);
      }
    
      public getUserId(): any {
        return sessionStorage.getItem(USER_ID_KEY);
      }
    
    
      public setUserNameComplete(name: string): void {
        window.sessionStorage.removeItem(NAME_KEY);
        window.sessionStorage.setItem(NAME_KEY, name);
      }
    
      public getUserNameComplete(): any {
        return sessionStorage.getItem(NAME_KEY);
      }
    
      public setUserName(userName: string): void {
        window.sessionStorage.removeItem(USERNAME_KEY);
        window.sessionStorage.setItem(USERNAME_KEY, userName);
      }
    
      public getUserName(): any {
        return sessionStorage.getItem(USERNAME_KEY);
      }
    
      public setAuthorities(authorities: string[]): void {
        window.sessionStorage.removeItem(AUTHORITIES_KEY);
        window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
      }
    
      public getAuthorities(): string[] {
        this.roles = [];
        if (sessionStorage.getItem(AUTHORITIES_KEY)) {
          JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)|| '{}').forEach(
            (aux:any) => {
              this.roles.push(aux.authorities);
            }
          );
        }
        console.log(">>>> TokenService " + this.roles.length);
        return this.roles;
      }


      public setMenus(menus: Menu[]):void {
        window.sessionStorage.removeItem(MENUS_KEY);
        window.sessionStorage.setItem(MENUS_KEY, JSON.stringify(menus));
      }

      public getMenus(): Menu[] {
        this.menus = [];
        if (sessionStorage.getItem(MENUS_KEY)) {   
          JSON.parse(sessionStorage.getItem(MENUS_KEY)|| '{}').forEach(
            (aux:any) => {
              this.menus.push(aux);
            }
          );
        }
        return this.menus;
      }

      public logOut(): void {
        window.sessionStorage.clear();
      }
}