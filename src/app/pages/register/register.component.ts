
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgClass, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly userService = inject(UserService)
  private readonly router = inject(Router)

  errormsg:any;

  registerForm: FormGroup = new FormGroup({
    name :new FormControl(null , [Validators.required,Validators.minLength(3)]),
    email :new FormControl(null , [Validators.required,Validators.email]),
    password :new FormControl(null , [Validators.required , Validators.pattern(/^[a-zA-Z0-9]{4,}$/)]),
    age :new FormControl(null , [Validators.required , Validators.min(20)]),
    phone :new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0,9]{8}$/)]),
  })


  registerUser(){

    if (this.registerForm.valid) {
      this.userService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          this.errormsg = null
          if (res.msg =="done") {
            this.router.navigate(["/login"])
          }
        },
  
        error:(err)=>{
        console.log(err)
        this.errormsg = err.error.msg
        }
      })
    }

  }
}
