import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../../core/interfaces/iproduct.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

    private readonly _HttpClient = inject(HttpClient);
    private readonly baseURL = 'https://ecommerce.routemisr.com/api/v1/brands'


    getAllBrands():Observable<{ data : Brand[]}>{
      return this._HttpClient.get<{ data : Brand[]}>(
      (`${environment.baseURL}/api/v1/brands`)
      );
    }
      getAllProducts(brandId:string):Observable<{data : any[]}>{
        return this._HttpClient.get<{ data: any[]}>(
        (`${environment.baseURL}/api/v1/products?brand=${brandId}`)
        );
      }
       
  
}
