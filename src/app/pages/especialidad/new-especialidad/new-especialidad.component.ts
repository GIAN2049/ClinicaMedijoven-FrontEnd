import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { EspecialidadService } from '../../../services/especialidad.service';

@Component({
  selector: 'app-new-especialidad',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatSnackBarModule],
  templateUrl: './new-especialidad.component.html',
  styleUrl: './new-especialidad.component.css'
})
export class NewEspecialidadComponent {

  form : FormGroup

  constructor(private fb:FormBuilder, private dialogRef: MatDialogRef<NewEspecialidadComponent>,
    private _especialidad:EspecialidadService, private snackbar:MatSnackBar
    
  ){


    this.newForm()

  }

  newForm(){

    this.form = this.fb.group({

      nombre : ['', Validators.required]

    })

  }

  save(){

    if(this.form.invalid) return

    this._especialidad.newEspecialidad(this.form.value).subscribe({

      next : result => {

          this.snackbar.open('Especialidad registrado','cerrar')
          this.dialogRef.close(true)
      }, error : error => {

        this.snackbar.open('Error','cerrar')
     

      }

    })

  }

}
