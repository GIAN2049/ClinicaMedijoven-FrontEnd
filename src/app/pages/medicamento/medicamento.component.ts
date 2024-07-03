import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Medicamento } from '../../Model/Medicamento';
import { MedicamentoService } from '../../services/medicamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddMedicamentoComponent } from './add-medicamento/add-medicamento.component';
import { UpdateMedicamentoComponent } from './update-medicamento/update-medicamento.component';

@Component({
  selector: 'app-medicamento',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './medicamento.component.html',
  styleUrl: './medicamento.component.css'
})
export default class MedicamentoComponent {
  readonly dialog = inject(MatDialog);

  medicamentos : Medicamento[]=[]

  constructor(private medicamentoService:MedicamentoService, private snackbar:MatSnackBar ){
  }

  ngOnInit(): void {
    this.getMedicamentos()
  }


  getMedicamentos(){
    this.medicamentoService.getMedicamento().subscribe(data =>{
      console.log("MEDICAMENTOS" + data);
      this.medicamentos=data.object
    })
  }

  
  addMedicamento(){

    const dialog = this.dialog.open( AddMedicamentoComponent, {
      width : '400px'
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getMedicamentos();
    })


  }

  updateMedicamento(medicamento:Medicamento){
    const dialog = this.dialog.open( UpdateMedicamentoComponent, {
      width : '600PX',
      data : medicamento
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getMedicamentos()
    })

  }

  deleteMedicamento(medico:any){
    this.medicamentoService.deleteMedicamento(medico.id).subscribe({
      next : result => {
        this.getMedicamentos()
        this.snackbar.open('Medicamento eliminado','cerrar')
      }, error : error => {
      this.snackbar.open('Error','cerrar')
      }
    })

  }
  
}
