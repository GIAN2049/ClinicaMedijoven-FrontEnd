import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EspecialidadService } from '../../../services/especialidad.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../../security/token.service';
import { Especialidad } from '../../../Model/Especialidad';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioUpdate } from '../../../Model/UsuarioUpdate';
import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-update-usuario',
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
  templateUrl: './update-usuario.component.html',
  styleUrl: './update-usuario.component.css'
})
export class UpdateUsuarioComponent {
  errors:string[]=[]
  objUsuario: UsuarioUpdate = {

      nombre: '',
      apellidos: '',
      dni: '',
      correo: '',
      telefono: '',
      login: '',
      password: '',
      sexo: '',
  
  };
  
  constructor(
    private dialogRef: MatDialogRef<UpdateUsuarioComponent>,
    private usuarioService: UsuarioService,
    private especialidadService: EspecialidadService,
    private snackbar: MatSnackBar,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.objUsuario = data;
    this.objUsuario.id = tokenService.getUserId();
  }

  actualizar() {
    
    this.usuarioService.updateUsuarios(this.objUsuario).subscribe(
      (x) => {
        this.snackbar.open('Usuario actualizado', 'cerrar');
        console.log("MENSAJE: " + x);
      },
      (error) => {
        this.errors.push(error.error.mensaje);
      }
    );
  }
}
