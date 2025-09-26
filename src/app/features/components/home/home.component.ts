import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Component, input, Input, InputSignal, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { CategoriesSliderComponent } from "./components/categories-slider/categories-slider.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms' 
import { SearchPipe } from '../../../shared/pipes/Search/search-pipe';
import { WishlistService } from '../../../shared/shared/services/Wishlist/wishlist.service';
@Component({
  selector: 'app-home',
  imports: [SearchPipe ,CategoriesSliderComponent, MainSliderComponent , RouterLink , CurrencyPipe , FormsModule, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private _ProductsService:ProductsService  , private _CartService:CartService, private toastr: ToastrService, private spinner: NgxSpinnerService, private _WishlistService :WishlistService,){}
  products!:IProduct[]
  fromInput:string = ''


  ngOnInit(): void {
  this._ProductsService.getAllProducts().subscribe({
    next: (res) => {
      this.products = res.data;

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
    }
  });
}

  addToCart(p_id:string){
    this._CartService.AddProductToCart(p_id).subscribe({
      next:(res)=>{
        this.spinner.hide()
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