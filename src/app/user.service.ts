import { Injectable } from '@angular/core';
import { User } from "./models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users:Array<User> = [
      {
        "firstName": "Pavle",
        "lastName": "Milanov",
        "email": "pavle@gmail.com",
        "password":"12345678",
        "dateOfBirth": "2003-14-10"
      },
      {
        "firstName": "Pavle2",
        "lastName": "Milanov2",
        "email": "pavle2@gmail.com",
        "password":"123456789",
        "dateOfBirth": "2003-14-10"
      },
      {
        "firstName": "Pavle3",
        "lastName": "Milanov3",
        "email": "pavle3@gmail.com",
        "password":"12345678910",
        "dateOfBirth": "2003-14-10"
      }
  ]

  currentUser:User;

  constructor() { }

  register(newUser:User):number {
    let emailExists:boolean = false;
    this.users.forEach((u) => {
      if (newUser.email === u.email){
        emailExists = true;
      }
    })
    if (emailExists){
      return -1
    }
    this.users.push(newUser);
    this.currentUser = newUser;
    return 0
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
