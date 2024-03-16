import { Injectable } from '@angular/core';
import { User } from "./models/user";
import { RegisterInput } from './models/register_input';
import { LoginInput } from './models/login_input';
import { Cart } from './models/cart';
import { CartItem } from './models/cartitem';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users:Array<User> = [
      {
        "id": 1,
        "firstName": "Pavle",
        "lastName": "Milanov",
        "email": "pavle@gmail.com",
        "password":"12345678",
        "dateOfBirth": "2003-14-10",
        "cart": { "cartItems": [] }
      },
      {
        "id" : 2,
        "firstName": "Pavle2",
        "lastName": "Milanov2",
        "email": "pavle2@gmail.com",
        "password":"123456789",
        "dateOfBirth": "2003-14-10",
        "cart": { "cartItems": [] }

      },
      {
        "id": 3,
        "firstName": "Pavle3",
        "lastName": "Milanov3",
        "email": "pavle3@gmail.com",
        "password":"12345678910",
        "dateOfBirth": "2003-14-10",
        "cart": { "cartItems": [] }     
     }
  ]

  currentUser:User = this.users[0];

  idCount = 4;

  constructor() { }

  register(newUser:RegisterInput):number {
    let emailExists:boolean = false;
    this.users.forEach((u) => {
      if (newUser.email === u.email){
        emailExists = true;
      }
    })
    if (emailExists){
      return -1
    }
    let userToAdd = {"id": this.idCount, "firstName": newUser.firstName, "lastName": newUser.lastName, "dateOfBirth" : newUser.dateOfBirth, "email": newUser.email, "password": newUser.password}
    this.users.push(userToAdd);
    this.currentUser = userToAdd;
    this.idCount++;
    return 0
  }

  login(userInput:LoginInput):number {
    let loggedIn:boolean = false;
    let userToLogin:User = null;
    this.users.forEach((u:User) => {
      if (userInput.email === u.email){
        if (userInput.password === u.password){
          loggedIn = true;
          userToLogin = u;
        }
      }
    })
    if (loggedIn) {
      this.currentUser = userToLogin;
      return 0;
    }
    else{
      return -1;
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  updateUser(oldUser:User, editedUser:User) {
    this.users.forEach((u:User, index:number) =>{
      if (oldUser.id === u.id){
        this.users[index] = editedUser;
        return;
      }
    })
    this.currentUser = editedUser;
  }

  addItemToCart(user:User, product:Product) {
    user.cart.cartItems.push({"product": product, "quantity": 1});
  }

  removeProductFromCart(user: User, product:Product|CartItem){
    //Bizzare way to check which interface product is.
    //Product
    if ('image' in product){
        user.cart.cartItems.forEach((c:CartItem ,indx:number) => {
        if (c.product === product) {
          user.cart.cartItems.splice(indx, 1);
          return;
        }
      })
    }
    //CartItem
    else if ('quantity' in product){
      user.cart.cartItems.forEach((c:CartItem ,indx:number) => {
        if (c == product) {
          user.cart.cartItems.splice(indx, 1);
          return;
        }
      })
    }
  }
}
