import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../shared/pipes/Search/search-pipe';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishlistService } from '../../../shared/shared/services/Wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [SearchPipe, RouterLink, CurrencyPipe, FormsModule, NgxPaginationModule, NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(private _ProductsService:ProductsService ,private _CartService:CartService, private toastr: ToastrService, private _WishlistService :WishlistService ){}
  products!:IProduct[]
  fromInput:string = ''  
  pageSize!:number
  p!:number
  total!:number

    ngOnInit(): void {
  this.getAllProductsData();
}

getAllProductsData(pageNumber: number = 1): void {
  this._ProductsService.getAllProducts(pageNumber).subscribe({
    next: (res) => {
      this.products = res.data;
      this.pageSize = res.metadata.limit;
      this.p = res.metadata.currentPage;
      this.total = res.results;
      this._WishlistService.GetLoggedUserWishlist().subscribe({
        next: (wishlistRes) => {
          const wishlistIds = wishlistRes.data.map((p: IProduct) => p._id);
          this.products.forEach(product => {
            product.inWishlist = wishlistIds.includes(product._id);
          });
        },
        error: (err) => console.log(err)
      });
      console.log(this.products);
    },
    error: (err) => {
      console.log(err);
    }
  });
}

 addToCart(p_id:string){
    this._CartService.AddProductToCart(p_id).subscribe({
      next:(res)=>{
        console.log(res);
        this._CartService.cartCount.next(res.numOfCartItems) 
        console.log('cart count in service' , this._CartService.cartCount);   
        this.toastr.success( res.message , res.status ,
          {
            timeOut : 3000,
            closeButton : true,
            progressBar: true,
          }
         )
      },   
    })
  }

  toggleWishlist(product: IProduct) {
  if (!product.inWishlist) {
    product.inWishlist = true;
    this._WishlistService.AddProductToWishlist(product._id).subscribe({
      next: (res) => {
        this.toastr.success(res.message, res.status, {
          timeOut: 2000,
          closeButton: true,
          progressBar: true,
        });
      },
      error: (err) => {
        console.log(err);
        product.inWishlist = false;
      }
    });
  } else {
    product.inWishlist = false;
    this._WishlistService.RemoveProductFromWishlist(product._id).subscribe({
      next: (res) => {
        this.toastr.info(res.message, res.status, {
          timeOut: 2000,
          closeButton: true,
          progressBar: true,
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
}
