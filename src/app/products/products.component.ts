import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { TagCount } from '../models/tag_count';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { CartItem } from '../models/cartitem'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private _productSvc: ProductService, private _userSvc: UserService) {}

  currentUser:User = this._userSvc.getCurrentUser();
  cartItems: Array<Product> = [];
  tagCounts:Array<TagCount>; 
  productsToShow:Array<Product> = [];
  userSearch:string = "";
  selectedTag: string = "all";

  p:number = 1;

  search(text:string){
    this.p = 1;
    this.applyFilters();
  }

  setTag(tag:string) {
    this.selectedTag = tag;
    this.applyFilters();
  }

  addToCart(item:Product) {
    let remove:boolean = false;
    this.currentUser.cart.cartItems.forEach((c:CartItem, indx:number) => {
      //This means the user wanted to remove the item from cart on click.
      if (c.product === item){
        this.cartItems.splice(0, 1);
        this._userSvc.removeProductFromCart(this.currentUser, item);
        remove = true;
      }
    })
    if (remove) {
      return;
    }
    else{
      this._userSvc.addItemToCart(this.currentUser, item);
      this.cartItems.push(item);      
    }
  }

  applyFilters(){
    this.productsToShow = []
    //Tag first:
    this._productSvc.getAllProducts().forEach((p:Product) => {
      if (this.selectedTag == "all"){
        if (p.name.toLowerCase().includes(this.userSearch.toLowerCase())) {
          this.productsToShow.push(p);
        }
      }
      else{
        if (p.tags.includes(this.selectedTag) && p.name.toLowerCase().includes(this.userSearch.toLowerCase())) {
          this.productsToShow.push(p);
        }
      }
      
    })
  }

  getAverageReviews(product:Product) {
    let ratings:Array<number> = product.reviews.map(r => r.rating);
    let sum = ratings.reduce((a, b) => a + b, 0);
    let average = sum / ratings.length; 
    return average
  }

  ngOnInit():void {
    this.productsToShow = this._productSvc.getAllProducts();
    this.tagCounts = this._productSvc.getTagsCount();

    if (this.currentUser){
      this.currentUser.cart.cartItems.forEach((p:CartItem) => {
        this.cartItems.push(p.product);
      })
    }
  }
}
