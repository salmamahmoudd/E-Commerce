import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { OrdersService } from '../../../../shared/services/Oreders/orders.service';
@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService)
  isLoading:boolean = false
  cartId!:string 
  checkOutForm:FormGroup = new FormGroup({
    details : new FormControl(null , Validators.required),
    phone : new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city : new FormControl(null , Validators.required),
  })

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId = param.get('c_id') !
        console.log(this.cartId);
      }
    })
  }

  checkOut(){
     this.isLoading = true; 
     if(this.checkOutForm.valid){
      console.log(this.checkOutForm);
      this._OrdersService.CheckOutSession(this.cartId , this.checkOutForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          window.open(res.session.url , '_self')
        }
      })
    }
  }
}
