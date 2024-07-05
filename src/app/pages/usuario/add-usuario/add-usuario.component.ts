import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MedicoService } from '../../../services/medico.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { TokenService } from '../../../security/token.service';
import { Especialidad } from '../../../Model/Especialidad';
import { Medico } from '../../../Model/Medico';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../Model/usuario';

@Component({
  selector: 'app-add-usuario',
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
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usario.component.css'
})
export class AddUsuarioComponent {
  errors:string[]=[]
  
  objUsuario: Usuario = {
      nombre: '',
      apellidos: '',
      dni: '',
      correo: '',
      telefono: '',
      login: '',
      password: '',
      roles: [
        {
          id: 1,
          rol: 'ADMINISTRADOR',
        },
      ],
      sexo: '',
    
  }
  
  
  objUsuarioAccess : Usuario = {};

  constructor(
    private dialogRef: MatDialogRef<AddUsuarioComponent>,
    private usuarioService: UsuarioService,
    private especialidadService: EspecialidadService,
    private snackbar: MatSnackBar,
    private tokenService: TokenService
  ) {
    this.objUsuarioAccess.id = tokenService.getUserId();
  }


  registra() {
    this.usuarioService.addUsuarios(this.objUsuario).subscribe(
      {
        next : x => {
          this.snackbar.open('USUARIO REGISTRADO', 'cerrar', {
            duration: 300
          })
        }, error : err => {
          this.snackbar.open('ERROR AL REGISTRAR MEDICO', 'cerrar', {
            duration: 300
          })
        }
      }
    );
  }
}
