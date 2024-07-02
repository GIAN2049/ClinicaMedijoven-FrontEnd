import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form:FormGroup

  constructor(private fb:FormBuilder){

    this.newForm()

  }

  newForm(){

    this.form = this.fb.group({

      username : ['', Validators.required],
      password : ['', Validators.required]


    })
    
  }

  save(){

    if(this.form.invalid) return

    console.log(this.form.value);

  }

}
