import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { UserService } from '../user.service';
import { CartItem } from '../models/cartitem'
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(public _productSvc: ProductService, public _userSvc: UserService) { }

  currentUser:User = this._userSvc.getCurrentUser();
  cartItems: Array<Product> = [];
  randomProducts: Array<Product> = [];

  ngOnInit():void {
    this.randomProducts = this._productSvc.getThreeRandomProdcuts();
    if (this.currentUser){
      this.currentUser.cart.cartItems.forEach((p:CartItem) => {
        this.cartItems.push(p.product);
      })
    }
  }

}
