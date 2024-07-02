import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { LoginUsuario } from '../../security/LoginUsuario';
import { TokenService } from '../../security/token.service';
import { AuthService } from '../../security/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  
  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario = {};
  roles: string[] = [];
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) {
    console.log(
      'constructor >> constructor >>> ' + this.tokenService.getToken()
    );
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.authService.login(this.loginUsuario).subscribe(
      (data: any) => {
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.login);
        this.tokenService.setUserNameComplete(data.nombreCompleto);
        this.tokenService.setAuthorities(data.authorities);
        this.tokenService.setUserId(data.idUsuario);
        this.tokenService.setMenus(data.menus);

        this.roles = data.authorities;
        this.router.navigate(['dashboard']);

        console.log('onLogin() >> token >>> ' + this.tokenService.getToken());
        console.log('onLogin() >> setUserName >>> ' + this.tokenService.getUserName());
        console.log('onLogin() >> setUserNameComplete >>> ' + this.tokenService.getUserNameComplete());
        console.log('onLogin() >> idUsuario >>> ' + this.tokenService.getUserId());
        console.log('onLogin() >> roles >>> ' + this.tokenService.getAuthorities());
        console.log('onLogin() >> Menus >>> INICIO >> ');
        this.tokenService.getMenus().forEach((obj) => {
          console.log(' >> onLogin() >> ' + obj.nombre);
        });
        console.log('onLogin() >> Menus >>> FIN >> ');
      },
      (err: any) => {
        this.isLogged = false;
        this.errMsj = err.message;
        console.log(err);
        if (err.status == 401) {
        }
      }
    );
  }  

}
