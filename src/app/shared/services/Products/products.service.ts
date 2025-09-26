import { IProduct } from './../../../core/interfaces/iproduct.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient = inject(HttpClient);

  getAllProducts(pageNumber:number = 1 ):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products?page=${pageNumber}`)
  }

  getSpecificProduct(p_id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products/${p_id}`)
  }
  
  getProductsBySubCategory(subcategoryId: string): Observable<{ data: IProduct[] }> {
    return this._HttpClient.get<{ data: IProduct[] }>(
      `${this.getProductsBySubCategory}?subcategory=${subcategoryId}`
    );
  }
   getAllBrands(brandId?: string): Observable<{ data: IProduct[] }> {
    return this._HttpClient.get<{ data: IProduct[] }>(
       (`${environment.baseURL}/api/v1/products?brand=${brandId}`)
    );
  }
     
  
}
