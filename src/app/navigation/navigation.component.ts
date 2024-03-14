import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'Navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  sidebarToggle:boolean = false;
  
  constructor(private _userSvc: UserService) {}

  getUser() {
    return this._userSvc.getCurrentUser();
  }

  toggle(){
    this.sidebarToggle = !this.sidebarToggle;
  }

}
