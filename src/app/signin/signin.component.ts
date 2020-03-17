import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  accounts: Account[];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private location: Location) { }

  signinForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
  }

  onSubmit() {

    if (this.signinForm.valid){
      console.log(`Form is Valid`);
    } else {
      console.log(`Form is Invalid`);
    }

  }

  fetchAccounts(username: string): void {
    const searchTerm = this.username.value;

    // console.log(`search term: ${searchTerm}`);

    //fetch all accounts matching the a term of the username inputed //TODO Will need to change it so only a full match of the username is returned in the service
    this.accountService.searchAccount(searchTerm).subscribe(accounts => { 
      this.accounts = accounts;
      this.confirmLogin();
    }) 
  }

  confirmLogin(){
    console.log(this.accounts);
    let account: Account;

    for (var counter: number = 0; counter < this.accounts.length ; counter ++) {
      account = this.accounts[counter];

      

      if (account.username === this.username.value) {
        if (account.password === this.password.value){
          this.login(account);
        }
      }
    }

    console.log(`No user match the username or password`);
  }

  login(account: Account) {
    //TODO POP UP
    console.log(`Account of ${account.name} has been Logged In`);
  }

  onClickSignIn(){
    this.fetchAccounts(this.username.value);
  }

  goBack(): void {
    this.location.back();
  }

  get username() { return this.signinForm.get('username'); }
  get password() { return this.signinForm.get('password'); }

}
