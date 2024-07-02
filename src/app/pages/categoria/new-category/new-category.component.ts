import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-category',
  standalone: true,

  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatSnackBarModule],

  
})
export class NewCategoryComponent {

  form : FormGroup

  constructor(private fb:FormBuilder, private dialogRef: MatDialogRef<NewCategoryComponent>,
    private _category:CategoryService, private snackbar:MatSnackBar
    
  ){


    this.newForm()

  }

  newForm(){

    this.form = this.fb.group({

      nombre : ['', Validators.required]

    })

  }

  save(){

    if(this.form.invalid) return

    this._category.newCategory(this.form.value).subscribe({

      next : result => {

          this.snackbar.open('Categoria registrado','cerrar')
          this.dialogRef.close(true)
      }, error : error => {

        this.snackbar.open('Error','cerrar')
     

      }

    })

  }


}
