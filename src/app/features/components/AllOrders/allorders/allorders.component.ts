import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../../shared/services/Oreders/orders.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../shared/services/authentication/auth.service';

@Component({
  selector: 'app-allorders',
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {

  userId!:string
  allOrders: any[] = [];
  loading: boolean = false;

  constructor(private _OrdersService :OrdersService ,private _AuthService :AuthService) {}

  ngOnInit(): void {
    this.userId =this._AuthService.userInfo.id;
    this._OrdersService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        this.allOrders = res;  
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }


}



