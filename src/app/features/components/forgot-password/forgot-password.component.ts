import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RestPasswordServiceService } from './rest-password-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  isLoading:boolean = false;
  errMsg:string = '';
  step:number = 1;
  private readonly _RestPasswordServiceService = inject(RestPasswordServiceService)
  private readonly router = inject(Router)

  forgotPasswordForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  ForgetForm(){
    this.isLoading = true;
    this._RestPasswordServiceService.ForgotPassword(this.forgotPasswordForm.value).subscribe({
      next:(res)=>{
        this.isLoading = false;
        this.step = 2;
      },
      error:(err)=>{
        this.errMsg = err.error.message;
        this.isLoading = false;
      }
    })
  }

  resetCodeForm:FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,20}$/)])
  })

  CodeForm(){
    this.isLoading = true;
    this._RestPasswordServiceService.resetCode(this.resetCodeForm.value).subscribe({
      next:(res)=>{
        this.isLoading = false;
        if(res.status == 'Success'){
        this.step = 3;
        }
      },
      error:(err)=>{
        this.errMsg = err.error.message;
        this.isLoading = false;
      }
    })
  }

  restPasswordForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,20}$/)])
  })

  PasswordForm(){
    this.isLoading = true;
    this._RestPasswordServiceService.restPassword(this.restPasswordForm.value).subscribe({
      next:(res)=>{
        this.isLoading = false;
        if(res.token){
        this.router.navigate(['/login'])
        }
      },
      error:(err)=>{
        this.errMsg = err.error.message;
        this.isLoading = false;
      }
    })
  }
}