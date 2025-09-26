import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject(HttpClient)
  private readonly _CookieService = inject(CookieService)
  userInfo:any

  decodeToken(){
    this.userInfo = jwtDecode( this._CookieService.get('token') ) 
  }
  SignUp(registerData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup` ,registerData )
  }
  SignIn(loginData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin` ,loginData )
  }
  
}
