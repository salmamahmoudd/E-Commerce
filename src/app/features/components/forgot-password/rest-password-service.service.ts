import { ForgotPasswordComponent } from './forgot-password.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IForgotpassword, Ipassword, IResetpassword } from '../../../core/interfaces/ipassword.interface';

@Injectable({
  providedIn: 'root'
})
export class RestPasswordServiceService {
  constructor(private http:HttpClient){}

  ForgotPassword(payload:IForgotpassword):Observable<any>{
    return this.http.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`,payload)

  }
   resetCode(payload:IResetpassword):Observable<any>{
    return this.http.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`,payload)

  }
   restPassword(payload:Ipassword):Observable<any>{
    return this.http.put(`${environment.baseURL}/api/v1/auth/resetPassword`,payload)

  }
  
}
