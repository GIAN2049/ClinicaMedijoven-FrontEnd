import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, RouterLink],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export default class PagesComponent {

}
