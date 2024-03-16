import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';
import { Router } from "@angular/router";
import { Order } from '../models/order'; 
import { User } from '../models/user'; 
import { Product } from '../models/product';
import { Review } from '../models/review';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  userOrders: Array<Order> = [];
  currentUser:User = null;
  toggledOrders:Array<boolean> = [];

  constructor (
    private _userSvc: UserService,
    private _productSvc: ProductService,
    private router: Router
  ) {}

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns 0-indexed month
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit ():void {
    this.currentUser = this._userSvc.getCurrentUser();
    if (!this._userSvc.getCurrentUser()) {
      this.router.navigate(["/"]);
    }
    this.userOrders = this.currentUser.orders;
    this.userOrders.forEach((o:Order) => {
      this.toggledOrders.push(false);
    })
  }

  toggleOrder(order:number) {
    this.toggledOrders[order] = !this.toggledOrders[order];
  }

  confirmOrder(order: Order){
    order.status = "arrived";
  }

  cancelOrder(order: Order){
    order.status = "cancelled";
  }

  setRating(value:number, product:Product) {
    let review:Review = {"rating" : value, "userID": this.currentUser.id};
    this._productSvc.addReview(product, review);
  }

}
