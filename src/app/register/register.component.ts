import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../models/user';
import {Router} from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit  {
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

    let status:number = this._userSvc.register({
      "firstName": this.form.value.firstName,
      "lastName": this.form.value.lastName,
      "email": this.form.value.email,
      "dateOfBirth": this.form.value.dateOfBirth,
      "password": this.form.value.password
    });
    console.log(status);
    if (status === -1){
      this.error = "An account with this email already exists!"
    }
    else if (status === 0){
      this.router.navigate(["/"]);    }
  }
}
