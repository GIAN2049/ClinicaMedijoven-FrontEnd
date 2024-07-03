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
    console.log('Datos de la receta a registrar:', this.objMedico);
    this.medicoService.registrarMedico(this.objMedico).subscribe(
      (x) => {
        this.snackbar.open('Medico registrado', 'cerrar');
        console.log('MENSAJE: ' + x.mensaje);
      },
      (error) => {
        this.errors.push(error.error.mensaje);
      }
    );
  }
}
