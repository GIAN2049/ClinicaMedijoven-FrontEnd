import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EspecialidadService } from '../../services/especialidad.service';
import { NewEspecialidadComponent } from './new-especialidad/new-especialidad.component';
import { EditEspecialidadComponent } from './edit-especialidad/edit-especialidad.component';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export default class EspecialidadComponent implements OnInit {

  readonly dialog = inject(MatDialog);

  data = []

  constructor(private _especialidad:EspecialidadService, private snackbar:MatSnackBar ){

  }

  ngOnInit(): void {
    
    this.getData()

  }

  getData(){

    this._especialidad.getEspecialidad().subscribe({

      next : result => {

        this.data = result.object
        console.log(this.data);

      }, error : error => {

        console.log(error);

      }

    })

  }


  newEspecialidad(){

    const dialog = this.dialog.open( NewEspecialidadComponent, {

      width : '400px'

    })

    dialog.afterClosed().subscribe( result => {

      if(!result) return

      this.getData()

    })


  }

  editEspecialidad(especialidad:any){

    const dialog = this.dialog.open( EditEspecialidadComponent, {

      width : '400px',
      data : especialidad

    })

    dialog.afterClosed().subscribe( result => {

      if(!result) return

      this.getData()

    })

  }

  deleteEspecialidad(especialidad:any){

    this._especialidad.deleteEspecialidad(especialidad.id).subscribe({

      next : result => {

        this.getData()
        this.snackbar.open('Especilidad eliminado','cerrar')

      }, error : error => {


      this.snackbar.open('Error','cerrar')
      }

    })

  }

}
