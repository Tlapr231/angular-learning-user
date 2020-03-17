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

  accounts$: Observable<Account[]>;
  private searchTerms = new Subject<string>();
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

    console.log(`search term: ${searchTerm}`);

    this.accountService.searchAccount(searchTerm).subscribe(accounts => { 
      this.accounts = accounts;
      this.update("51");
    }) 

    // this.accounts$ = this.accountService.searchAccount(searchTerm);
    // this.accounts$.subscribe(accounts => this.accounts = accounts);
    // this.update("56");
  }

  update(msg: string){
    console.log(`Line ${msg} accounts : `);
    console.log(this.accounts);
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
