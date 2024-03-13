import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'Navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  sidebarToggle:boolean = false;
  
  toggle(){
    this.sidebarToggle = !this.sidebarToggle;
  }

}
