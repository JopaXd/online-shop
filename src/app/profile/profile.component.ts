import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../models/user';
import {Router} from "@angular/router"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit  {
  form!: FormGroup
  submitted = false;
  error?: string;
  currentUser:User = null;
  uneditedUser: User = null;

  constructor(
    private formBuilder: FormBuilder,
    private _userSvc: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    let loggedInUser: User = this._userSvc.getCurrentUser();
    if (!loggedInUser){
      this.router.navigate(["/login"]);
    }
    this.currentUser = {...loggedInUser} as User;
    this.uneditedUser = {...loggedInUser} as User;
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.form.invalid) {
      return;
    }
    this._userSvc.updateUser(this.uneditedUser, this.currentUser);
  }
}
