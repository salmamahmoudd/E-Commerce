import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators }  from '@angular/forms'
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _CookieService = inject(CookieService)
  private readonly _Router = inject(Router)

    flag:boolean = true;


  loginForm : FormGroup = this._FormBuilder.group({
    email : [null ,  [Validators.required, Validators.email] ],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,20}$/)]] 
  })
  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm);
      this._AuthService.SignIn(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          
          if(res.message === "success"){
            this._CookieService.set('token' , res.token)
            if(this._CookieService.get('token')){
              this._AuthService.decodeToken()
              console.log(this._AuthService.userInfo);
              
            }
            this._Router.navigate(['/home'])
          }
        }
      })

      
    }
  }
}
