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
  constructor(public _productSvc: ProductService, public _userSvc: UserService) {}

  currentUser:User = this._userSvc.getCurrentUser();
  cartItems: Array<Product> = [];
  tagCounts:Array<TagCount>; 
  productsToShow:Array<Product> = [];
  userSearch:string = "";
  selectedTag: string = "all";

  p:number = 1;

  search(text:string){
    this.applyFilters();
  }

  setTag(tag:string) {
    this.p = 1;
    this.selectedTag = tag;
    this.applyFilters();
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
