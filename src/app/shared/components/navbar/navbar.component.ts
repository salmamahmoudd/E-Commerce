import { CookieService } from 'ngx-cookie-service';
import { Component, input, InputSignal, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { CartService } from '../../services/Cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(private _CartService:CartService, private _CookieService:CookieService ,private flowbiteService: FlowbiteService , private _AuthService:AuthService , private _Router :Router) {}

  userName!:string
  cartBadge!:number
  check:InputSignal<boolean> = input(false)

  logOut(){
    this._Router.navigate(['/login'])
    this._CookieService.delete('token')
    this._AuthService.userInfo = null
  }

 ngOnInit(): void {
  this.flowbiteService.loadFlowbite((flowbite) => {
    initFlowbite();
  });

  if(this._CookieService.get('token')){
    this._AuthService.decodeToken(); 
    console.log(this._AuthService.userInfo); 
    this.userName = this._AuthService.userInfo.name;
    this._CartService.GetLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartBadge = res.numOfCartItems
      }
    })
  }

  this._CartService.cartCount.subscribe({
    next:(value)=>{
      this.cartBadge = value
    }
  })
}
}
