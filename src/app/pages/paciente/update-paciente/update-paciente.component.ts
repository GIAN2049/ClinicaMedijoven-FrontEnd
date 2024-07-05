import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PacienteService } from '../../../services/paciente.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../../security/token.service';
import { UsuarioUpdate } from '../../../Model/UsuarioUpdate';
import { Usuario } from '../../../Model/usuario';
import { PacienteUpdate } from '../../../Model/PacienteUpdate';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-paciente',
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
  templateUrl: './update-paciente.component.html',
  styleUrl: './update-paciente.component.css'
})
export class UpdatePacienteComponent {
  errors:string[]=[]
  objPaciente: PacienteUpdate = {
    usuario: {
      nombre : '',
      apellidos : '',
      dni : '',
      correo : '',
      telefono : '',
      login : '',
      password : '',
      sexo : ''
    },
    tipoSangre:'',
    disponible:true    
  };

  objUsuario : Usuario = {};

  constructor(
    private dialogRef: MatDialogRef<UpdatePacienteComponent>,
    private pacienteService: PacienteService,
    private snackbar: MatSnackBar,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.objPaciente = data;
    this.objUsuario.id = tokenService.getUserId();
  }


  actualizar() {
    this.pacienteService.actualizarPacientes(this.objPaciente).subscribe(
      {
        next : x => {
          this.snackbar.open('PACIENTE ACTUALIZADO', 'cerrar', {
            duration: 300
          })
          this.dialogRef.close(true)
        }, error : err => {
          this.snackbar.open('ERROR AL ACTUALIZAR PACIENTE', 'cerrar', {
            duration: 300
          })
        }
      }
    );
  }
}
