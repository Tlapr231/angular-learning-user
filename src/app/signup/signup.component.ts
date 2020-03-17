import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //variables
  accounts: Account[];

  //constructor
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private location: Location) {}

  //form information
  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required], //TODO : Going to need validation on this to make sure there are no duplicates
    password: ['', [Validators.required, Validators.minLength(4)]]
  })

  ngOnInit() {
    this.getAccounts();
  }

  //Db methods
  getAccounts(): void {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  add(account: Account): void {
    this.accountService.addAccount(account as Account).subscribe(account => {        
      this.accounts.push(account);
    });
  }

  //form methods
  onSubmit() {

    if (this.signupForm.valid){
      console.log(`Form is Valid`);
    } else {
      console.log(`Form is Invalid`);
    }

  }

  onClickSubmit() {

    if (this.signupForm.valid) {

      const account: Account = {
        name: this.name.value.trim(),
        email: this.email.value.trim(),
        username: this.username.value.trim(),
        password: this.password.value.trim()
      }

      this.add(account);

      console.log(account);
      this.onSubmit();
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }



  //Getters

  get name() { return this.signupForm.get('name'); }
  get username() { return this.signupForm.get('username'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

}