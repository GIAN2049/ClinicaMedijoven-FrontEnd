import { Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Receta } from '../../Model/Receta';
import { RecetaService } from '../../services/receta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddRecetaComponent } from './add-receta/add-receta.component';
import { UpdateRecetaComponent } from './update-receta/update-receta.component';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css'
})
export default class RecetaComponent {
  readonly dialog = inject(MatDialog);

  recetas : Receta[]=[]

  constructor(private recetaService : RecetaService, private snackbar:MatSnackBar ){
  }

  ngOnInit(): void {
    this.getRecetas()
  }


  getRecetas(){
    this.recetaService.listar().subscribe(data =>{
      console.log(data);
      this.recetas=data.object
    })
  }

  
  addRecetaService(){

    const dialog = this.dialog.open( AddRecetaComponent, {
      width : '600PX'
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getRecetas()
    })


  }

  

  updateRecetaService(receta:Receta){
    const dialog = this.dialog.open( UpdateRecetaComponent, {
      width : '600PX',
      data : receta
    })

    dialog.afterClosed().subscribe( result => {
      if(!result) return
      this.getRecetas()
    })

  }

  deleteRecetaService(receta:any){
    this.recetaService.delete(receta.id).subscribe({
      next : result => {
        this.getRecetas()
        this.snackbar.open('Receta Eliminada','cerrar')
      }, error : error => {
      this.snackbar.open('Error','cerrar')
      }
    })

  }
}
