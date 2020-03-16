import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  @Input() account: Account;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getAccount();
  }

  getAccount(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountService.getAccount(id).subscribe(account => this.account = account);
    console.log(this.account);
  }

  save(): void {
    this.accountService.updateAccount(this.account).subscribe(() => this.goBack())
  }

  goBack(): void {
    this.location.back();
  }

}