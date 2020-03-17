import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  account: Account;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private location: Location
  ) { }

  signinForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
  }

  //form methods
  onSubmit() {

    if (this.signinForm.valid){
      console.log(`Form is Valid`);
    } else {
      console.log(`Form is Invalid`);
    }

  }

  onClickSignIn(){
  }

  goBack(): void {
    this.location.back();
  }

  get username() { return this.signinForm.get('username'); }
  get password() { return this.signinForm.get('password'); }

}