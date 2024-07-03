import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { UpdateUsuarioComponent } from './update-usuario/update-usuario.component';
import { Usuario } from '../../Model/usuario';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export default class UsuarioComponent {
  readonly dialog = inject(MatDialog);

  usuarios : Usuario[]=[]

  constructor(private usuarioService:UsuarioService, private snackbar:MatSnackBar ){
  }

  ngOnInit(): void {
    this.getUsuario()
  }


  getUsuario(){
    this.usuarioService.getUsuarios().subscribe(data =>{
      console.log(data);
      this.usuarios=data.object
    })
  }

  
  addUsuarios(){

    const dialog = this.dialog.open( AddUsuarioComponent, {
      width : '400px'
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getUsuarios()
    })


  }

  

  updateUsuarios(usuario:Usuario){
    const dialog = this.dialog.open( UpdateUsuarioComponent, {
      width : '600PX',
      data : usuario
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getUsuarios()
    })

  }
  getUsuarios() {
    throw new Error('Method not implemented.');
  }

  deleteUsuarios(usuario:any){
    this.usuarioService.deleteUsuarios(usuario.id).subscribe({
      next : result => {
        this.getUsuarios()
        this.snackbar.open('Usuario eliminado','cerrar')
      }, error : error => {
      this.snackbar.open('Error','cerrar')
      }
    })

  }
  
}
