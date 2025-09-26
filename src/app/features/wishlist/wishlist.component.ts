import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct.interface';
import { WishlistService } from '../../shared/shared/services/Wishlist/wishlist.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [NgIf , NgFor],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})

export class WishlistComponent implements OnInit {

  wishlistProducts: IProduct[] = [];
  constructor(
    private _WishlistService: WishlistService,
    private ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getWishlist();
  }
  getWishlist() {
    this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishlistProducts = res.data; 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  removeFromWishlist(productId: string) {
    this._WishlistService.RemoveProductFromWishlist(productId).subscribe({
      next: (res) => {
        this.wishlistProducts = this.wishlistProducts.filter(p => p._id !== productId);
        this.ToastrService.info(res.message, res.status, {
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

