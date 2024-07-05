import { Component } from '@angular/core';
import { HistoriaClinicaService } from '../../../services/HistoriaClinica.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PacienteService } from '../../../services/paciente.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../../security/token.service';
import { Paciente } from '../../../Model/Paciente';
import { Usuario } from '../../../Model/usuario';
import { HistoriaClininca } from '../../../Model/HistoriaClinica';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-historia-clinica',
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
  templateUrl: './add-historia-clinica.component.html',
  styleUrl: './add-historia-clinica.component.css'
})
export class AddHistoriaClinicaComponent {
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
    private dialogRef: MatDialogRef<AddHistoriaClinicaComponent>,
    private hclinicaService: HistoriaClinicaService,
    private pacienteService: PacienteService,
    private snackbar: MatSnackBar,
    private tokenService: TokenService
  ) {
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


  registra() {
    console.log('Datos de la historia clinica a registrar:', this.objHClinica);
    this.hclinicaService.registrar(this.objHClinica).subscribe(
      {
        next : x => {
          this.snackbar.open('HISTORIA CLINICA REGISTRADA', 'cerrar', {
            duration : 300
          })
          this.dialogRef.close(true)
        }, error : err => {
          this.snackbar.open('error al registrar', 'cerrar', {
            duration : 300
          })
          this.dialogRef.close(true)
        }   
      }
    );
  }
}
