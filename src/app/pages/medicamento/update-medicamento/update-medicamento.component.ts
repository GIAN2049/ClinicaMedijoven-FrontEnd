import { Component, Inject } from '@angular/core';
import { Medicamento } from '../../../Model/Medicamento';
import { Categoria } from '../../../Model/Categoria';
import { Usuario } from '../../../Model/usuario';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MedicamentoService } from '../../../services/medicamento.service';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../../security/token.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-medicamento',
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
  templateUrl: './update-medicamento.component.html',
  styleUrl: './update-medicamento.component.css'
})
export class UpdateMedicamentoComponent {
  errors:string[]=[]

  objMedicamento : Medicamento = {
    nombre : '',
    stock : 0,
    precio : 0,
    categoria : {
      id : -1,
      nombre: ''
    }
  }

  lstCategoria : Categoria[]=[]

  objUsuario : Usuario = {};

  constructor(
    private dialogRef: MatDialogRef<UpdateMedicamentoComponent>,
    private medicamentoService: MedicamentoService,
    private categoriaService: CategoryService,
    private snackbar: MatSnackBar,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.objMedicamento = data;
    this.objUsuario.id = tokenService.getUserId();
  }

  ngOnInit(): void {
    this.getCategoria()
  }


  getCategoria(){
    this.categoriaService.getCategory().subscribe(data =>{
      console.log(data);
      this.lstCategoria=data.object
    })
  }

  actualizar() {
    this.medicamentoService.updateMedicamento(this.objMedicamento).subscribe(
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
