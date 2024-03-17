import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { TagCount } from '../models/tag_count';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { CartItem } from '../models/cartitem';
import { ActivatedRoute } from '@angular/router';
import { Notification } from '../models/notification'
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})

export class ProductsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public _productSvc: ProductService,
    public _userSvc: UserService,
  ) {}

  currentUser: User = this._userSvc.getCurrentUser();
  cartItems: Array<Product> = [];
  tagCounts: Array<TagCount>;
  productsToShow: Array<Product> = [];
  userSearch: string = '';
  selectedTag: string = '';

  notifications: Array<Notification> = [];

  p: number = 1;

  search(text: string) {
    this.p = 1;
    this.applyFilters();
  }

  setTag(tag: string) {
    this.p = 1;
    this.selectedTag = tag;
    this.applyFilters();
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

  applyFilters() {
    this.productsToShow = [];
    //Tag first:
    this._productSvc.getAllProducts().forEach((p: Product) => {
      if (this.selectedTag == 'all') {
        if (p.name.toLowerCase().includes(this.userSearch.toLowerCase())) {
          this.productsToShow.push(p);
        }
      } else {
        if (
          p.tags.includes(this.selectedTag) &&
          p.name.toLowerCase().includes(this.userSearch.toLowerCase())
        ) {
          this.productsToShow.push(p);
        }
      }
    });
  }

  closeNotification(notif: Notification) {
    this.notifications.forEach((n: Notification, indx: number) => {
      if (notif === n) {
        this.notifications.splice(indx, 1);
      }
    });
  }

  ngOnInit(): void {
    this.selectedTag = this.route.snapshot.paramMap.get('selectedTag') || 'all';

    this.productsToShow = this._productSvc.getAllProducts();
    this.tagCounts = this._productSvc.getTagsCount();

    if (this.currentUser) {
      this.currentUser.cart.cartItems.forEach((p: CartItem) => {
        this.cartItems.push(p.product);
      });
    }
  }
}
