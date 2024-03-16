import { Injectable } from '@angular/core';
import { allProducts } from './products';
import { Product } from './models/product';
import { TagCount } from './models/tag_count';
import { Review } from './models/review';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getAllProducts():Array<Product> {
    return allProducts;
  }

  getThreeRandomProdcuts():Array<Product> {
    //Shuffle Array
    const shuffled:Array<Product> = allProducts.sort(() => 0.5 - Math.random());
    //Get 3 random products
    let selected:Array<Product> = shuffled.slice(0, 3);
    return selected;
  }

  getTags():Array<string> {
    let tags:Array<string> = [];
    allProducts.forEach((p:Product) => {
      p.tags.forEach((t:string) => {
        if (!tags.includes(t)){
          tags.push(t);
        }
      })
    })
    return tags;
  } 

  getTagsCount():Array<TagCount> {
    let tags:any = {};
    let tagsList:Array<TagCount> = [];
    allProducts.forEach((p:Product) => {
      p.tags.forEach((t:string) => {
        if (!Object.keys(tags).includes(t)){
          tags[t] = 0;
        }
        else{
          tags[t]++;
        }
      })
    })
    tagsList.push({"tag": "all", "count": this.getAllProducts().length})
    Object.keys(tags).forEach((key:string) => {
      tagsList.push({"tag":key, "count":tags[key]});
    })
    return tagsList;
  }

  addReview(product:Product, review:Review){
    //Check if there is already a review by this user.
    let ratingEdited:boolean = false;
    product.reviews.forEach((r:Review, indx:number) => {
      console.log("edit");
      if (r.userID === review.userID) {
        //Edit the review.
        product.reviews[indx] = review;
        ratingEdited = true;
        return;
      }
    })
    if (!ratingEdited){
      product.reviews.push(review);
    }
  }
}
