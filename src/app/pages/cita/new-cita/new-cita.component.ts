import {ChangeDetectionStrategy, Component, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { CitaService } from '../../../services/cita.service';
import { combineLatest } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-new-cita',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatSnackBarModule, MatSelectModule],
  templateUrl: './new-cita.component.html'
  
})
export class NewCitaComponent implements OnInit {

  form : FormGroup
  medicos = []
  pacientes = []

  constructor(private fb:FormBuilder, private dialogRef: MatDialogRef<NewCitaComponent>,
    private _cita:CitaService, private snackbar:MatSnackBar
    
  ){


    this.newForm()

  }

  ngOnInit(): void {

    this.getData()
    
  }

  newForm(){

    this.form = this.fb.group({

      fechaCita : ['', Validators.required],
      hora : ['', Validators.required],
      idPaciente : ['', Validators.required],
      idMedico : ['', Validators.required]

    })

  }

  save(){

    if(this.form.invalid) return


    this._cita.newCita(this.form.value).subscribe({

      next : result => {

          this.snackbar.open('Cita registrado','cerrar')
          this.dialogRef.close(true)
          
      }, error : error => {

        this.snackbar.open('Error','cerrar')
     

      }

    })

  }

  getData(){

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
