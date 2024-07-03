import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddMedicoComponent } from './add-medico/add-medico.component';
import { UpdateMedicoComponent } from './update-medico/update-medico.component';
import { Medico } from '../../Model/Medico';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css'
})
export default class MedicoComponent {
  readonly dialog = inject(MatDialog);

  medicos : Medico[]=[]

  constructor(private medicoService:MedicoService, private snackbar:MatSnackBar ){
  }

  ngOnInit(): void {
    this.getMedicos()
  }


  getMedicos(){
    this.medicoService.getMedico().subscribe(data =>{
      console.log(data);
      this.medicos=data.object
    })
  }

  
  addMedicos(){

    const dialog = this.dialog.open( AddMedicoComponent, {
      width : '400px'
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getMedicos()
    })


  }

  

  updateMedicos(medico:Medico){
    const dialog = this.dialog.open( UpdateMedicoComponent, {
      width : '600PX',
      data : medico
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getMedicos()
    })

  }

  deleteMedicos(medico:any){
    this.medicoService.eliminarMedico(medico.id).subscribe({
      next : result => {
        this.getMedicos()
        this.snackbar.open('Medico eliminado','cerrar')
      }, error : error => {
      this.snackbar.open('Error','cerrar')
      }
    })

  }
  
}
