import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';
import { Router } from "@angular/router";
import { Order } from '../models/order'; 
import { User } from '../models/user'; 
import { Product } from '../models/product';
import { Review } from '../models/review';
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { Notification } from '../models/notification'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class OrdersComponent implements OnInit {

  userOrders: Array<Order> = [];
  currentUser:User = null;
  toggledOrders:Array<boolean> = [];

  notifications: Array<Notification> = [];

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
    let newNotification: Notification = { text: 'Order confirmed!', type: 'success' };
    this.notifications.push(newNotification);
    setTimeout(() => {
      this.closeNotification(newNotification);
    }, 5000);
  }

  cancelOrder(order: Order){
    order.status = "cancelled";
    let newNotification: Notification = { text: 'Order cancelled!', type: 'danger' };
    this.notifications.push(newNotification);
    setTimeout(() => {
      this.closeNotification(newNotification);
    }, 5000);
  }

  setRating(value:number, product:Product) {
    let review:Review = {"rating" : value, "userID": this.currentUser.id};
    this._productSvc.addReview(product, review);
  }

  checkRating(product:Product, rating:number){
    let trueRating:boolean = false;
    if (product.reviews.length > 0) {
      product.reviews.forEach((r:Review) => {
        if (r.userID === this.currentUser.id) {
          if (r.rating === rating){
            trueRating = true;
            return;
          }
          else{
            //A user can have only one rating.
            //If a rating with an id is found, at it is not the desired rating, its false.
            return false;
          }
        }
      })
      return trueRating;
    }
    else{
      return false;
    }
  }

  closeNotification(notif: Notification) {
    this.notifications.forEach((n: Notification, indx: number) => {
      if (notif === n) {
        this.notifications.splice(indx, 1);
      }
    });
  }

}
