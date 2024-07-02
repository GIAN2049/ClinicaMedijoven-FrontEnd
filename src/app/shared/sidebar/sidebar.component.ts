import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '../../security/Menu';
import { TokenService } from '../../security/token.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  isLogged = false;
  menus : Menu[] = [];

  ngOnInit() {
    console.log("MenuComponent >>> ngOnInit >>> ");

    this.menus = this.tokenService.getMenus();

    console.log("MenuComponent >>> ngOnInit >>> " + this.tokenService.getToken());
    if (this.tokenService.getToken()) {
      console.log("MenuComponent >>> this.isLogged = true >>> ");
      this.isLogged = true;
    } else {
      console.log("MenuComponent >>> this.isLogged = false >>> ");
      this.isLogged = false;
    }
  }

  constructor(private tokenService: TokenService) {
    console.log("MenuComponent >>> constructor >>> " + this.tokenService.getToken());
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
}
