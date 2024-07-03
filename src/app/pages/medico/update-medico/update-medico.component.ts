import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MedicoService } from '../../../services/medico.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../../security/token.service';
import { Especialidad } from '../../../Model/Especialidad';
import { Usuario } from '../../../Model/usuario';
import { MedicoUpdate } from '../../../Model/MedicoUpdate';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-medico',
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
  templateUrl: './update-medico.component.html',
  styleUrl: './update-medico.component.css'
})
export class UpdateMedicoComponent {
  errors:string[]=[]
  objMedico: MedicoUpdate = {
    usuario: {
      nombre: '',
      apellidos: '',
      dni: '',
      correo: '',
      telefono: '',
      login: '',
      password: '',
      sexo: '',
    },
    especialidad:{
      id: 2,
    },
    disponible:true    
  };
  
  lstEspecialidad : Especialidad[]=[];

  objUsuario : Usuario = {};

  constructor(
    private dialogRef: MatDialogRef<UpdateMedicoComponent>,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private snackbar: MatSnackBar,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.objMedico = data;
    this.objUsuario.id = tokenService.getUserId();
  }

  ngOnInit(): void {
    this.getEspecialidad()
  }


  getEspecialidad(){
    this.especialidadService.getEspecialidad().subscribe(data =>{
      console.log(data);
      this.lstEspecialidad=data.object
    })
  }

  actualizar() {
    console.log(">>>>>>>>>> ID MEDICO: " + this.objMedico.id);
    console.log(">>>>>>>>>> ID USUARIO: " + this.objMedico.usuario.id);
  
    this.medicoService.actualizarMedico(this.objMedico).subscribe(
      (x) => {
        this.snackbar.open('Medico actualizado', 'cerrar');
        console.log("MENSAJE: " + x);
      },
      (error) => {
        this.errors.push(error.error.mensaje);
      }
    );
  }
}
