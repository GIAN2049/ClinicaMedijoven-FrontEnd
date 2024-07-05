import { Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Receta } from '../../Model/Receta';
import { RecetaService } from '../../services/receta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddRecetaComponent } from './add-receta/add-receta.component';
import { UpdateRecetaComponent } from './update-receta/update-receta.component';
import { TokenService } from '../../security/token.service';
import { Usuario } from '../../Model/usuario';
import { Rol } from '../../Model/Rol';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css'
})
export default class RecetaComponent {
  readonly dialog = inject(MatDialog);

  recetas : Receta[]=[]
  roles : Rol[]=[]
  idUsuarioLog : number

  constructor(private recetaService : RecetaService, private snackbar:MatSnackBar,
    private tokenService: TokenService, private usuarioService : UsuarioService
  ){
    this.idUsuarioLog = tokenService.getUserId();
  }

  ngOnInit(): void {
    this.getRecetas();
    this.getRolesUsuarioId();
    this.isNotPaciente();
    
  }


  getRecetas(){
    this.recetaService.listar().subscribe(data =>{
      console.log(data);
      this.recetas=data.object
    })
  }

  getRolesUsuarioId(){
    this.usuarioService.getRolesIdUsuario(this.idUsuarioLog).subscribe(
      data => {
        console.log(data)
        this.roles = data.object
      }
    )
  }
  
  addRecetaService(){

    const dialog = this.dialog.open( AddRecetaComponent, {
      width : '600PX'
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getRecetas()
    })


  }

  

  updateRecetaService(receta:Receta){
    const dialog = this.dialog.open( UpdateRecetaComponent, {
      width : '600PX',
      data : receta
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getRecetas()
    })

  }

  deleteRecetaService(receta:any){
    this.recetaService.delete(receta.id).subscribe({
      next : result => {
        this.getRecetas()
        this.snackbar.open('Receta Eliminada','cerrar')
      }, error : error => {
      this.snackbar.open('Error','cerrar')
      }
    })

  }

  isNotPaciente(): boolean {
    const isNotPaciente = this.roles.some(role => {
      if (role.rol !== 'PACIENTE') {
        console.log(role.rol);
        return true;
      }
      return false;
    });
    return isNotPaciente;
  }
  

}
