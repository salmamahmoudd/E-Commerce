import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
   private readonly _HttpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.baseURL}/api/v1/wishlist`;

  GetLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(this.baseUrl);
  }

  AddProductToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl, { productId });
  }

  RemoveProductFromWishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${productId}`);
  }
}


  

