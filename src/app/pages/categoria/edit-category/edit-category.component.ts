import {ChangeDetectionStrategy, Component, Inject, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatSnackBarModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {

  form : FormGroup

  constructor(private fb:FormBuilder, private dialogRef: MatDialogRef<EditCategoryComponent>,
    private _category:CategoryService, private snackbar:MatSnackBar, @Inject(MAT_DIALOG_DATA) public data
    
  ){


    this.newForm()

  }

  ngOnInit(): void {
    
    this.loadData()

  }

  newForm(){

    this.form = this.fb.group({

      id : ['', Validators.required],
      nombre : ['', Validators.required]

    })

  }

  loadData(){

    this.form.reset({
      id : this.data.id,
      nombre : this.data.nombre

    })

  }

  save(){

    if(this.form.invalid) return

    this._category.updateCategory(this.form.value).subscribe({

      next : result => {

          this.snackbar.open('Categoria actualizado','cerrar')
          this.dialogRef.close(true)

      }, error : error => {

        this.snackbar.open('Error','cerrar')
     

      }

    })

  }

}
