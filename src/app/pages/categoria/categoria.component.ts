import { ChangeDetectionStrategy,Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';

import { NewCategoryComponent } from './new-category/new-category.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export default class CategoriaComponent implements OnInit {

  readonly dialog = inject(MatDialog);


  data = []

  constructor(private _category:CategoryService, private snackbar:MatSnackBar ){

  }

  ngOnInit(): void {
    
    this.getData()

  }

  getData(){

    this._category.getCategory().subscribe({

      next : result => {

        this.data = result.object
        console.log(this.data);

      }, error : error => {

        console.log(error);

      }

    })

  }


  newCategory(){

    const dialog = this.dialog.open( NewCategoryComponent, {

      width : '400px'

    })

    dialog.afterClosed().subscribe( result => {

      if(!result) return

      this.getData()

    })


  }

  editCategory(category:any){

    const dialog = this.dialog.open( EditCategoryComponent, {

      width : '400px',
      data : category

    })

    dialog.afterClosed().subscribe( result => {

      if(!result) return

      this.getData()

    })

  }

  deleteCategory(category:any){

    this._category.deleteCategory(category.id).subscribe({

      next : result => {

        this.getData()
        this.snackbar.open('Categoria eliminado','cerrar')

      

      }, error : error => {


      this.snackbar.open('Error','cerrar')
      }

    })

  }

}
