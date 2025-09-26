import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { NgClass } from '@angular/common';
import { WishlistService } from '../../../shared/shared/services/Wishlist/wishlist.service';

@Component({
  selector: 'app-p-details',
  imports: [CarouselModule, NgClass],
  templateUrl: './p-details.component.html',
  styleUrl: './p-details.component.css'
})
export class PDetailsComponent implements OnInit{
  constructor(private _CartService:CartService, private toastr: ToastrService, private _WishlistService :WishlistService){}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

  productId!:string
  productDetails:IProduct = {   }   as IProduct

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
  next:(param)=>{
    this.productId = param.get('p_id')!;
    
    this._ProductsService.getSpecificProduct(this.productId).subscribe({
      next:(res)=>{
        this.productDetails = res.data;
        console.log(res.data);

        this._WishlistService.GetLoggedUserWishlist().subscribe({
          next: (res) => {
            this.productDetails.inWishlist = res.data.some((p: IProduct) => p._id === this.productDetails._id);
          },
          error: (err) => console.log(err)
        });
      },
      error:(err)=>{
        console.log(err);
      }
    });

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
