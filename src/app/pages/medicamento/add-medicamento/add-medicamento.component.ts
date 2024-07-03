import { Component } from '@angular/core';
import { Medicamento } from '../../../Model/Medicamento';
import { Categoria } from '../../../Model/Categoria';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MedicamentoService } from '../../../services/medicamento.service';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../../security/token.service';
import { Usuario } from '../../../Model/usuario';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-medicamento',
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
  templateUrl: './add-medicamento.component.html',
  styleUrl: './add-medicamento.component.css'
})
export class AddMedicamentoComponent {

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
    private dialogRef: MatDialogRef<AddMedicamentoComponent>,
    private medicamentoService: MedicamentoService,
    private categoriaService: CategoryService,
    private snackbar: MatSnackBar,
    private tokenService: TokenService
  ) {
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

  registra() {
    this.medicamentoService.newMedicamento(this.objMedicamento).subscribe(
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
