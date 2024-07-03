import {ChangeDetectionStrategy, Component, Inject, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { CitaService } from '../../../services/cita.service';
import { combineLatest } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-cita',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatSnackBarModule, MatSelectModule],
  templateUrl: './edit-cita.component.html',

})
export class EditCitaComponent {

  form : FormGroup
  medicos = []
  pacientes = []

  constructor(private fb:FormBuilder, private dialogRef: MatDialogRef<EditCitaComponent>,
    private _cita:CitaService, private snackbar:MatSnackBar, @Inject(MAT_DIALOG_DATA) public data
    
  ){

   

    this.newForm()

  }

  ngOnInit(): void {

    this.getData()
    this.loadForm()
    
  }

  newForm(){

    this.form = this.fb.group({
      id : ['', Validators.required],
      fechaCita : ['', Validators.required],
      hora : ['', Validators.required],
      idPaciente : ['', Validators.required],
      idMedico : ['', Validators.required]

    })

  }

  loadForm(){

    this.form.reset({

      id : this.data.id,
      fechaCita :   this.data.fechaCita.split('T')[0],
      hora :  this.data.hora,
      idPaciente :  this.data.idPaciente,
      idMedico :  this.data.idMedico,

    })

  }


  save(){

    if(this.form.invalid) return


    this._cita.updateCita(this.form.value).subscribe({

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
