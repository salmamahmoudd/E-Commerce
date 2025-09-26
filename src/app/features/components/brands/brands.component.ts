import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands.service';
import { Brand } from '../../../core/interfaces/iproduct.interface';
import { RouterLink } from '@angular/router';
import { BrandProductsComponent } from '../../brand-products/brand-products.component';
import { NgxPaginationModule } from "ngx-pagination";


@Component({
  selector: 'app-brands',
  imports: [RouterLink, BrandProductsComponent, NgIf, NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {

  constructor(private _BrandsService :BrandsService){}
  allBrands!: Brand[];
  selectedSpecificBrand!: Brand[];

    
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data
        console.log(res.data);
      },
      error:(err)=>{
        console.log(err);
    }
        
    })
  }
  showSepBrands(brand_id:string){
    this._BrandsService.getAllProducts(brand_id).subscribe({
      next:(res)=> {
        this.selectedSpecificBrand = res.data,
        console.log(res);
        
      },
      error: (err)=> {
        console.log(err);
        
      }
    })
  }


}
