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
import { Usuario } from '../../../Model/usuario';
import { Rol } from '../../../Model/Rol';


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
    MatSelectModule,
  ],
  templateUrl: './update-usuario.component.html',
  styleUrl: './update-usuario.component.css',
})
export class UpdateUsuarioComponent {
  errors: string[] = [];
  objUsuario: UsuarioUpdate = {
    nombre: '',
    apellidos: '',
    dni: '',
    correo: '',
    telefono: '',
    login: '',
    password: '',
    roles: [],
    sexo: ''
  };

  objUsuarioToken : Usuario = {}
  selectedRolId: number = -1;
  lstRoles: Rol[] = [];

  constructor(
    private dialogRef: MatDialogRef<UpdateUsuarioComponent>,
    private usuarioService: UsuarioService,
    private especialidadService: EspecialidadService,
    private snackbar: MatSnackBar,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.objUsuario = data;
    
    if (this.objUsuario.roles.length > 0) {
      this.selectedRolId = this.objUsuario.roles[0].id!;
    }
    
    this.objUsuarioToken.id = tokenService.getUserId();
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.usuarioService.getRoles().subscribe((data) => {
      console.log(data);
      this.lstRoles = data.object;
    });
  }

  actualizar() {
    if (this.selectedRolId !== -1) {
      this.objUsuario.roles = [{ id: this.selectedRolId }]; // Set the selected role
    } else {
      this.objUsuario.roles = [];
    }
    
    this.usuarioService.updateUsuarios(this.objUsuario).subscribe({
      next : x => {
        this.snackbar.open('Usuario actualizado', 'cerrar', {
          duration : 300
        });
        this.dialogRef.close(true)
        console.log('MENSAJE: ' + x);      
      }, error : errors => {
        this.errors.push(errors.error.mensaje);
      }
    });
  }
}