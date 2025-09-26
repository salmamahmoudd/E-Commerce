import { WishlistService } from './../../shared/shared/services/Wishlist/wishlist.service';
import { ProductsService } from './../../shared/services/Products/products.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../core/interfaces/iproduct.interface';
import { CatagoriesService } from '../../shared/services/Categories/catagories.service';
import { error } from 'console';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-sub-category',
  imports: [RouterLink,NgClass,NgIf],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent {
 private readonly _ProductsService = inject(ProductsService);
 private readonly _ActivatedRoute = inject(ActivatedRoute);
 private readonly _CartService = inject(CartService);
 private readonly _WishlistService = inject(WishlistService);
 private readonly Toster = inject(ToastrService);
  private readonly _CatagoriesService = inject(CatagoriesService)
 subcategory_id!:string;
 products!:IProduct[]
 productDetails:IProduct = {   }   as IProduct
 wishlistProducts: IProduct[] = [];
 
 


  ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (param) => {
      this.subcategory_id = param.get('s_id')!;
      
      this._CatagoriesService.getAllProducts(this.subcategory_id).subscribe({
        next:(res)=> {
          this.products = res.data;
          console.log(this);
          
        }
      })
      

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
        console.log(res);
        this._CartService.cartCount.next(res.numOfCartItems) 
        console.log('cart count in service' , this._CartService.cartCount);   
        this.Toster.success( res.message , res.status ,
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
        this.Toster.success(res.message, res.status, {
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
        this.Toster.info(res.message, res.status, {
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
