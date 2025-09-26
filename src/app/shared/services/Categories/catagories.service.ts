import { ICategory } from './../../../core/interfaces/icategory.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IProduct } from '../../../core/interfaces/iproduct.interface';

@Injectable({
  providedIn: 'root'
})
export class CatagoriesService {

  private readonly _HttpClient = inject(HttpClient);
  private readonly baseURL = 'https://ecommerce.routemisr.com/api/v1/products'

  getAllCategories():Observable<{ data : ICategory[]}>{
    return this._HttpClient.get<{ data : ICategory[]}>(
    (`${environment.baseURL}/api/v1/categories`)
    );
  }
  getSubCategories(categoryId:string):Observable<{data : ICategory[]}>{
    return this._HttpClient.get<{ data: ICategory[]}>(
    (`${environment.baseURL}/api/v1/categories/${categoryId}/subcategories`)
    );
  }
   getAllProducts(subcategoryId?: string): Observable<{ data: IProduct[] }> {
    return this._HttpClient.get<{ data: IProduct[] }>(
       (`${environment.baseURL}/api/v1/products?subcategory=${subcategoryId}`)
    );
  }


  
}
