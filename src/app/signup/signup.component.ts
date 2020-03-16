import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService) {}

  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required], //Going to need validation on this to make sure there are no duplicates
    password: ['', [Validators.required, Validators.minLength(4)]]
  })

  accounts: Account[];

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts(): void {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  add(account: Account): void {
    this.accountService.addAccount({ name } as Account).subscribe(account => {        
      this.accounts.push(account);
    });
  }

  delete(account: Account): void {
    this.accounts = this.accounts.filter(a => a !== account);
    this.accountService.deleteAccount(account).subscribe();
  }

 onSubmit() {

    if (this.signupForm.valid){
      console.log(`Form is Valid`);
    } else {
      console.log(`Form is Invalid`);
    }

  }

  //Getters

  get name() { return this.signupForm.get('name'); }
  get username() { return this.signupForm.get('username'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

}