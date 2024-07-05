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
import { Usuario } from '../../../Model/usuario';
import { Medico } from '../../../Model/Medico';

@Component({
  selector: 'app-add-medico',
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
  templateUrl: './add-medico.component.html',
  styleUrl: './add-medico.component.css'
})
export class AddMedicoComponent {
  errors:string[]=[]
  
  objMedico: Medico = {
    usuario: {
      nombre: '',
      apellidos: '',
      dni: '',
      correo: '',
      telefono: '',
      login: '',
      password: '',
      roles: [
        {
          id: 2,
          rol: 'MEDICO',
        },
      ],
      sexo: '',
    },
    especialidad:{
      id:-1
    },
    disponible:true    
  };
  

  lstEspecialidad : Especialidad[]=[];
  
  objUsuario : Usuario = {};

  constructor(
    private dialogRef: MatDialogRef<AddMedicoComponent>,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private snackbar: MatSnackBar,
    private tokenService: TokenService
  ) {
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


  registra() {
    this.medicoService.registrarMedico(this.objMedico).subscribe({
      next : result => {
        this.snackbar.open('MEDICO REGISTRADO', 'cerrar', {
          duration : 300
        })
        this.dialogRef.close(true)
      }, error : err => {
        this.snackbar.open('ERROR AL REGISTRAR MEDICO', 'cerrar', {
          duration : 300
        })
        this.errors.push(err.mensaje)
      }
    })
  }
}
