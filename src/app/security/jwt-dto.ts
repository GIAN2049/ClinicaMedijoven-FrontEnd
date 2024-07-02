import { Menu } from "./Menu";

export class JwtDTO{
    token?: string;
    type?: string;
    nombreUsuario?: string;
    authorities?: string[];
    menus?: Menu[];
}