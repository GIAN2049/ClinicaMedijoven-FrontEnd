import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HistoriaClininca } from '../../Model/HistoriaClinica';
import { HistoriaClinicaService } from '../../services/HistoriaClinica.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddHistoriaClinicaComponent } from './add-historia-clinica/add-historia-clinica.component';
import { UpdateHistoriaClinicaComponent } from './update-historia-clinica/update-historia-clinica.component';
import { UsuarioService } from '../../services/usuario.service';
import { TokenService } from '../../security/token.service';
import { Rol } from '../../Model/Rol';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [RouterOutlet,RouterLink, CommonModule],
  templateUrl: './historia-clinica.component.html',
  styleUrl: './historia-clinica.component.css'
})
export default class HistoriaClinicaComponent {
  readonly dialog = inject(MatDialog);

  hclinicas : HistoriaClininca[]=[]
  roles : Rol[]=[]
  idUsuarioLog : number

  constructor(private hclinicaService : HistoriaClinicaService, private snackbar:MatSnackBar, 
    private tokenService: TokenService, private usuarioService : UsuarioService
  ){
    this.idUsuarioLog = tokenService.getUserId();
  }

  ngOnInit(): void {
    this.getMedicos()
    this.getRolesUsuarioId();
    this.isNotPaciente();
  }


  getMedicos(){
    this.hclinicaService.obtenerTodos().subscribe(data =>{
      console.log(data);
      this.hclinicas=data.object
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
  
  addHistoriaClinica(){

    const dialog = this.dialog.open( AddHistoriaClinicaComponent, {
      width : '600PX'
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getMedicos()
    })


  }

  

  updateHistoriaClinica(hclinica:HistoriaClininca){
    const dialog = this.dialog.open( UpdateHistoriaClinicaComponent, {
      width : '600PX',
      data : hclinica
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getMedicos()
    })

  }

  deleteHistoriaClinica(hclinica:any){
    this.hclinicaService.eliminar(hclinica.id).subscribe({
      next : result => {
        this.getMedicos()
        this.snackbar.open('Historial Clinica Eliminada','cerrar')
      }, error : error => {
      this.snackbar.open('Error','cerrar')
      }
    })
  }

  isNotPaciente(): boolean {
    const isNotPaciente = this.roles.some(role => {
      if (role.rol !== 'PACIENTE') {
        return true;
      }
      return false;
    });
    return isNotPaciente;
  }
}
