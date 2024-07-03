import { Component, Inject, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { EspecialidadService } from '../../../services/especialidad.service';

@Component({
  selector: 'app-edit-especialidad',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatSnackBarModule],
  templateUrl: './edit-especialidad.component.html',
  styleUrl: './edit-especialidad.component.css'
})
export class EditEspecialidadComponent implements OnInit {

  form : FormGroup

  constructor(private fb:FormBuilder, private dialogRef: MatDialogRef<EditEspecialidadComponent>,
    private _especialidad:EspecialidadService, private snackbar:MatSnackBar, @Inject(MAT_DIALOG_DATA) public data

  

  ){

    console.log(data);
    this.newForm()

  }

  ngOnInit(): void {
    
    this.loadData()

  }

  newForm(){

    this.form = this.fb.group({

      id : ['', Validators.required],
      nombre : ['', Validators.required]

    })

  }

  loadData(){

    this.form.reset({
      id : this.data.id,
      nombre : this.data.nombre

    })

  }

  save(){

    if(this.form.invalid) return

    this._especialidad.updateEspecialidad(this.form.value).subscribe({

      next : result => {

          this.snackbar.open('Especialidad actualizado','cerrar')
          this.dialogRef.close(true)

      }, error : error => {

        this.snackbar.open('Error','cerrar')
     

      }

    })

  }

}