import { Component, Inject } from '@angular/core';
import { HistoriaClininca } from '../../../Model/HistoriaClinica';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HistoriaClinicaService } from '../../../services/HistoriaClinica.service';
import { PacienteService } from '../../../services/paciente.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../../security/token.service';
import { Paciente } from '../../../Model/Paciente';
import { Usuario } from '../../../Model/usuario';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-historia-clinica',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatSnackBarModule,  
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './update-historia-clinica.component.html',
  styleUrl: './update-historia-clinica.component.css'
})
export class UpdateHistoriaClinicaComponent {
  errors:string[]=[]
  
  objHClinica: HistoriaClininca = {
    paciente : {
      id : -1
    },
    fechaRegistro : new Date(),
    diagnostico : '',
    tratamientos :'',
    resultadosPruebas :''
  };
  

  lslPaciente : Paciente[]=[];
  
  objUsuario : Usuario = {};

  constructor(
    private dialogRef: MatDialogRef<UpdateHistoriaClinicaComponent>,
    private hclinicaService: HistoriaClinicaService,
    private pacienteService: PacienteService,
    private snackbar: MatSnackBar,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.objHClinica = data;
    this.objUsuario.id = tokenService.getUserId();
  }

  
  ngOnInit(): void {
    this.getPacientes()
  }


  getPacientes(){
    this.pacienteService.getPacientes().subscribe(data =>{
      console.log(data);
      this.lslPaciente=data.object
    })
  }


  actualizar() {
    console.log('Datos de la historia clinica a registrar:', this.objHClinica);
    this.hclinicaService.actualizar(this.objHClinica).subscribe({
      next : x => {
        this.snackbar.open('HISTORIA CLINICA ACTUALIZADA', 'cerrar',{
          duration : 300
        })
        this.dialogRef.close(true)
      }, error : err => {
        this.snackbar.open('ERROR AL ACTUALIZAR', 'cerrar',{
          duration : 300
        })
        this.dialogRef.close(true)
      }
    });
  }
}