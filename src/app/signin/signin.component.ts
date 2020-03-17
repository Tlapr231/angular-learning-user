import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';

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

  //form methods
  onSubmit() {

    if (this.signinForm.valid){
      console.log(`Form is Valid`);
    } else {
      console.log(`Form is Invalid`);
    }

  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  // fetchAccounts(username: string): void {

  //   this.searchTerm = this.username.value;
  //   this.accountService.searchAccount(this.searchTerm).subscribe(account => {        
  //   this.accounts$.push(account);
  //   });

  //   console.log(this.accounts$);
  // }

  // onClickSignIn(){
  //   this.fetchAccounts(this.username.value);
  // }

  goBack(): void {
    this.location.back();
  }

  get username() { return this.signinForm.get('username'); }
  get password() { return this.signinForm.get('password'); }

}

//  users$: Observable<User[]> ;
//   private searchTerms = new Subject<string>();

//   constructor(private userService: UserService) { }

//   search(term: string): void {
//     this.searchTerms.next(term);
//   }

//   ngOnInit(): void {
//     this.users$ = this.searchTerms.pipe(
//       debounceTime(300),
//       distinctUntilChanged(),
//       switchMap((term:string) => this.userService.searchUsers(term)),
//     );
//   }