import { Injectable } from '@angular/core';
import { allProducts } from './products';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getAllProducts() {
    return allProducts;
  }

  getThreeRandomProdcuts() {
    //Shuffle Array
    const shuffled:Array<Product> = allProducts.sort(() => 0.5 - Math.random());
    //Get 3 random products
    let selected:Array<Product> = shuffled.slice(0, 3);
    return selected;
  }

}
