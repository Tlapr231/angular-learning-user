import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataAccountService implements InMemoryDbService {

  createDb() {
    const Accounts = [
      {id: 11, name: 'Admin Istrator', email: 'Admin@foo.com', password: 'adminpass'},
      {id: 12, name: 'Thierry Laprade', email: 'thierry.laprade@gmail.com', password: 'password123'}
    ];
    return Accounts;
  }

  genId(accounts: Account[]): number {
    return accounts.length > 0 ? Math.max(...accounts.map(account => account.id)) +1 :11;
  }
}