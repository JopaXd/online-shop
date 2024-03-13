import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private _productSvc: ProductService) { }

  randomProducts: Array<Product> = [];

  ngOnInit():void {
    this.randomProducts = this._productSvc.getThreeRandomProdcuts();
  }

}
