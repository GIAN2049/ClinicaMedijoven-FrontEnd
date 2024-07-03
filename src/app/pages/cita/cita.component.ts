import { Component, OnInit, inject } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewCitaComponent } from './new-cita/new-cita.component';
import { EditCitaComponent } from './edit-cita/edit-cita.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-cita',
  standalone: true,
  imports: [DatePipe, MatDialogModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './cita.component.html'
})
export default class CitaComponent implements OnInit {

  readonly dialog = inject(MatDialog);

  data = []
  medicos = []
  pacientes = []
  constructor(private _cita:CitaService, private snackbar:MatSnackBar){

  }

  ngOnInit(): void {
  
    this.getData()
    this.getDatos()
    
  }


  newCita(){

    const dialog = this.dialog.open( NewCitaComponent, {

      width : '700px'

    })

    dialog.afterClosed().subscribe( result => {

      if(!result) return

      this.getData()

    })

  }

  getData(){

    this._cita.getCita().subscribe( result => {

        this.data = result.object

    })

  }

  deleteCita(cita:any){

    this._cita.deleteCita(cita.id).subscribe({

      next : result => {

        this.getData()
        this.snackbar.open('Cita eliminado','cerrar')

      

      }, error : error => {


      this.snackbar.open('Error','cerrar')
      }

    })

  }

  editCita(cita:any){

    const dialog = this.dialog.open( EditCitaComponent, {

      width : '700px',
      data : cita

    })

    dialog.afterClosed().subscribe( result => {

      if(!result) return

      this.getData()

    })

  }


  shortDate(input:string){

    return input.split('T')[0]

  }

  getPaciente(id: number) {
    return this.pacientes.find(x => x.id === id);
  }


  getMedico(id: number) {
    return this.medicos.find(x => x.id === id);
  }


  getDatos(){

    combineLatest([

      this._cita.getMedicos(),
      this._cita.getPacientes()

    ]).subscribe({
      
      next : ([medicos, pacientes]) => {

        this.medicos = medicos.object
        this.pacientes = pacientes.object

      }

    })

  }

}
