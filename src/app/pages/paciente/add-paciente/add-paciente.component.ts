import { Component } from '@angular/core';
import { Paciente } from '../../../Model/Paciente';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PacienteService } from '../../../services/paciente.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../../security/token.service';
import { Usuario } from '../../../Model/usuario';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-paciente',
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
  templateUrl: './add-paciente.component.html',
  styleUrl: './add-paciente.component.css'
})
export class AddPacienteComponent {
  errors:string[]=[]
  
  objPaciente: Paciente = {
    usuario: {
      nombre : '',
      apellidos : '',
      dni : '',
      correo : '',
      telefono : '',
      login : '',
      password : '',
      roles: [
        {
          id: 3,
          rol: 'PACIENTE',
        },
      ],
    },
    tipoSangre:'',
    disponible:true    
  };
  

  objUsuario : Usuario = {};

  constructor(
    private dialogRef: MatDialogRef<AddPacienteComponent>,
    private pacienteService: PacienteService,
    private snackbar: MatSnackBar,
    private tokenService: TokenService
  ) {
    this.objUsuario.id = tokenService.getUserId();
  }

  registra() {
    this.pacienteService.registrarPacientes(this.objPaciente).subscribe(
      {
        next : x => {
          this.snackbar.open('PACIENTE REGISTRADO', 'cerrar', {
            duration: 300
          })
          this.dialogRef.close(true)
        }, error : err => {
          this.snackbar.open('ERROR AL REGISTRAR PACIENTE', 'cerrar', {
            duration: 300
          })
        }
      }
    );
  }
}
