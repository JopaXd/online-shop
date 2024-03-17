import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { UserService } from '../user.service';
import { CartItem } from '../models/cartitem'
import { User } from '../models/user';
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { Notification } from '../models/notification'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  constructor(public _productSvc: ProductService, public _userSvc: UserService) { }

  currentUser:User = this._userSvc.getCurrentUser();
  cartItems: Array<Product> = [];
  randomProducts: Array<Product> = [];

  notifications: Array<Notification> = [];

  ngOnInit():void {
    this.randomProducts = this._productSvc.getThreeRandomProdcuts();
    if (this.currentUser){
      this.currentUser.cart.cartItems.forEach((p:CartItem) => {
        this.cartItems.push(p.product);
      })
    }
  }

  addToCart(product: Product, cartItems: Array<Product>) {
    let status: string = this._userSvc.addToCart(product, cartItems);
    console.log(status);
    let newNotification: Notification = null;
    if (status === "removed") {
      newNotification = { text: 'Removed item from cart!', type: 'warning' };
    } else {
      newNotification = { text: 'Added item to cart!', type: 'success' };
    }
    this.notifications.push(newNotification);
    setTimeout(() => {
      this.closeNotification(newNotification);
    }, 5000);
  }

  closeNotification(notif: Notification) {
    this.notifications.forEach((n: Notification, indx: number) => {
      if (notif === n) {
        this.notifications.splice(indx, 1);
      }
    });
  }

}
