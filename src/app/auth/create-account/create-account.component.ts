import { Component } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../security/token.service';
import { Paciente } from '../../Model/Paciente';
import { Usuario } from '../../Model/usuario';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
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
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export default class CreateAccountComponent {
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
    private pacienteService: PacienteService,
    private snackbar: MatSnackBar,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.objUsuario.id = tokenService.getUserId();
  }

  registra() {

    this.router.navigate(['/']);

    this.pacienteService.registrarPacientes(this.objPaciente).subscribe(
      {
        next : x => {
          this.snackbar.open('PACIENTE REGISTRADO', 'cerrar', {
            duration: 300
          })
        }, error : err => {
          this.snackbar.open('ERROR AL REGISTRAR PACIENTE', 'cerrar', {
            duration: 300
          })
        }
      }
    );
  }
}
