import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../models/user';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  submitted = false;
  error?: string;

  constructor(
    private formBuilder: FormBuilder,
    private _userSvc: UserService,
    private router: Router

  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
    let status = this._userSvc.login({"email": this.form.value.email, "password": this.form.value.password})
    if (status === -1) {
      this.error = "Email or password incorrect!";
    }
    else{
      console.log("success!");
      this.router.navigate(["/"]);
    }
  }


}
