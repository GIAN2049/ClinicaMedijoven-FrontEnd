import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paciente } from '../../Model/Paciente';
import { AddPacienteComponent } from './add-paciente/add-paciente.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePacienteComponent } from './update-paciente/update-paciente.component';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export default class PacienteComponent {
  readonly dialog = inject(MatDialog);

  pacientes : Paciente[]=[]

  constructor(private pacienteService:PacienteService, private snackbar:MatSnackBar ){
  }

  ngOnInit(): void {
    this.getPacientes()
  }


  getPacientes(){
    this.pacienteService.getPacientes().subscribe(data =>{
      console.log(data);
      this.pacientes=data.object
    })
  }

  
  addPacientes(){

    const dialog = this.dialog.open( AddPacienteComponent, {
      width : '400px'
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getPacientes()
    })


  }

  

  updatePacientes(paciente:Paciente){
    const dialog = this.dialog.open( UpdatePacienteComponent, {
      width : '600PX',
      data : paciente
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getPacientes()
    })

  }

  deletePacientes(paciente:any){
    this.pacienteService.eliminarPacientes(paciente.id).subscribe({
      next : result => {
        this.getPacientes()
        this.snackbar.open('Paciente eliminado','cerrar')
      }, error : error => {
      this.snackbar.open('Error','cerrar')
      }
    })

  }

}
