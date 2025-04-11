import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


import { UserService } from '../../core/services/user/user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly userService = inject(UserService)
  private readonly router = inject(Router)

  errormsg:any;

  loginForm: FormGroup = new FormGroup({

    email :new FormControl(null , [Validators.required,Validators.email]),
    password :new FormControl(null , [Validators.required , Validators.pattern(/^[a-zA-Z0-9]{4,}$/)]),

  })


  loginUser(){

    if(this.loginForm.valid){
      this.userService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          
         
          if (res.msg =="done") {
            this.errormsg = null
            localStorage.setItem('Token', res.token)
            this.router.navigate(["/home"])
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
