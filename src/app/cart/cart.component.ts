import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router"
import { User } from '../models/user';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartitem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {

  constructor (
    private _userSvc: UserService,
    private router : Router,
  ) {}

  currentUser: User = null;
  userCart:Cart = null;
  cartTotal:number = 0;

  updateCartTotal() {
    this.cartTotal = 0;
    this.userCart = this.currentUser.cart;
    this.userCart.cartItems.forEach((c:CartItem) => {
      this.cartTotal = this.cartTotal + (c.product.price) * c.quantity + 300;
    })
  }

  ngOnInit() {
    this.currentUser = this._userSvc.getCurrentUser();
    if (!this.currentUser){
      this.router.navigate(["/login"]);
    }
    this.updateCartTotal();
    console.log(this._userSvc.getCurrentUser().cart)
  }

  removeFromCart(item: CartItem){
    this._userSvc.removeProductFromCart(this.currentUser, item);
    this.updateCartTotal();
  }

  changeQuantity(quantity:any, cart_item:CartItem){
    cart_item.quantity = Number(quantity.target.value);
    this.updateCartTotal();
  }

  generateRandomId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
  }

  increaseQty(inputRef:any, cart_item:CartItem) {
    inputRef.value++;
    cart_item.quantity++;
    this.updateCartTotal();
  }

  decreaseQty(inputRef:any, cart_item:CartItem) {
    inputRef.value--;
    cart_item.quantity--;
    this.updateCartTotal();
  }

  buy() {
    let currentDate: Date = new Date();
    let newOrder = {"id": this.generateRandomId(10), "order": {...this.currentUser.cart}, "date" : currentDate, "status": "in progress", "orderCost": this.cartTotal}
    this.currentUser.orders.push(newOrder);
    this.currentUser.cart.cartItems = [];
    this.userCart = null;
  }
}
