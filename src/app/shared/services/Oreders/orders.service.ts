import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly _HttpClient = inject(HttpClient)

  CheckOutSession(c_id:string , shipingData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${c_id}?url=${environment.domain}`,
      { shippingAddress : shipingData }
    )
  }
  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/orders/user/${userId}`,
    );
  }
  
}
