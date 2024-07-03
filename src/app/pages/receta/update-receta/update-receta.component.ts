import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../../security/token.service';
import { Medico } from '../../../Model/Medico';
import { Paciente } from '../../../Model/Paciente';
import { Especialidad } from '../../../Model/Especialidad';
import { Categoria } from '../../../Model/Categoria';
import { Medicamento } from '../../../Model/Medicamento';
import { Usuario } from '../../../Model/usuario';
import { RecetaService } from '../../../services/receta.service';
import { MedicoService } from '../../../services/medico.service';
import { PacienteService } from '../../../services/paciente.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { CategoryService } from '../../../services/category.service';
import { MedicamentoService } from '../../../services/medicamento.service';
import { Receta } from '../../../Model/Receta';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-receta',
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
  templateUrl: './update-receta.component.html',
  styleUrl: './update-receta.component.css'
})
export class UpdateRecetaComponent {
  errors:string[]=[]
  
  objReceta: Receta = {
    medico : {
      id : -1
    },
    paciente : {
      id : -1
    },
    especialidad : {
      id : -1
    },
    categoria : {
      id : -1
    },
    medicamento : {
      id : -1
    },
    fechaRegistro : new Date(),
    detalles: ''
  };
  

  lstMedico : Medico[]=[];
  lslPaciente : Paciente[]=[];
  lstEspecialidad : Especialidad[]=[];
  lslCategoria : Categoria[]=[];
  lslMedicamento : Medicamento[]=[];
  
  objUsuario : Usuario = {};
  constructor(
    private dialogRef: MatDialogRef<UpdateRecetaComponent>,

    private snackbar: MatSnackBar,
    private tokenService: TokenService,
    private recetaService: RecetaService,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private especialidadService: EspecialidadService,
    private categoriaService: CategoryService,
    private medicamentoService: MedicamentoService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.objReceta = data;
    this.objUsuario.id = tokenService.getUserId();
  }

  
  ngOnInit(): void {
    this.getMedicos()
    this.getPacientes()
    this.getEspecialidad()
    this.getCategoria()
    this.getMedicamento()
  }


  getMedicos(){
    this.medicoService.getMedico().subscribe(data =>{
      console.log(data);
      this.lstMedico=data.object
    })
  }

  getPacientes(){
    this.pacienteService.getPacientes().subscribe(data =>{
      console.log(data);
      this.lslPaciente=data.object
    })
  }

 
  getEspecialidad(){
    this.especialidadService.getEspecialidad().subscribe(data =>{
      console.log(data);
      this.lstEspecialidad=data.object
    })
  }
  getCategoria(){
    this.categoriaService.getCategory().subscribe(data =>{
      console.log(data);
      this.lslCategoria=data.object
    })
  }
  getMedicamento(){
    this.medicamentoService.getMedicamento().subscribe(data =>{
      console.log(data);
      this.lslMedicamento=data.object
    })
  }

  actualizar() {
    console.log('Datos de la historia clinica a registrar:', this.objReceta);
    this.recetaService.edit(this.objReceta).subscribe(
      (x) => {
        this.snackbar.open('Receta actualizada', 'cerrar');
        console.log('MENSAJE: ' + x);
      },
      (error) => {
        this.errors.push(error.error.mensaje);
      }
    );
  }
}
