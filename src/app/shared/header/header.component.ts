import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../security/token.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLogged = false;
  username : string =  "";

  constructor(private tokenService: TokenService, private router: Router,) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.username = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.username = '';
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['']);
    //window.location.reload();
  }
}
