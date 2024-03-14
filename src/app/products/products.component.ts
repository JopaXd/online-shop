import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { TagCount } from '../models/tag_count';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private _productSvc: ProductService) {}

  tagCounts:Array<TagCount>; 
  allProducts:Array<Product> = [];
  productsToShow:Array<Product> = [];
  userSearch:string;

  search(text:string){
    this.productsToShow = []
    this.allProducts.forEach((p:Product) => {
      if (p.name.toLowerCase().includes(text.toLowerCase())){
        this.productsToShow.push(p);
      }
    })
    console.log(this.productsToShow)
  }

  ngOnInit():void {
    this.allProducts = this._productSvc.getAllProducts();
    this.productsToShow = this.allProducts;
    this.tagCounts = this._productSvc.getTagsCount();
  }
}
