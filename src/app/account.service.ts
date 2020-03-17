import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Account } from './account';
import { MessageService } from './message.service';

@Injectable()
export class AccountService {

  //Constructors and variables/Constants
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  private accountsUrl = 'api/accounts';

  httpOptions = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' })
  }

  //Getters
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl).pipe(
      tap(_ => this.log('Fetched Accoutns')),
      catchError(this.handleError<Account[]>('getAccounts', []))
    )
  }

  getAccount(id: number): Observable<Account> {
    const url = `${this.accountsUrl}/${id}`;

    return this.http.get<Account>(url).pipe(
      tap(_ => this.log(`Fetched Account id: ${id}`)),
      catchError(this.handleError<Account>(`getAccount id: ${id}`))
    );
  }

  //Add Account
  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountsUrl, account, this.httpOptions).pipe(
      tap((newAccount: Account) => this.log(`Added Account with id: ${newAccount.id}`)),
      catchError(this.handleError<Account>('addAccount'))
    );
  }

  //Delete Account
  deleteAccount(account: Account | number): Observable<Account> {
    const id = typeof account === 'number' ? account : account.id;
    const url = `${this.accountsUrl}/${id}`;

    return this.http.delete<Account>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted Account id: ${id}`)),
      catchError(this.handleError<Account>('deleteAccount'))
    );
  } 

  //Update Account
  updateAccount (account: Account): Observable<any> {
    return this.http.put(this.accountsUrl, account, this.httpOptions).pipe(
      tap(_ => this.log(`Updated Account id: ${account.id}`)),
      catchError(this.handleError(`updateAccount`))
    );
  }

  //Search Account (by Username)
  searchAccount(term: string): Observable<Account[]> {
    if (!term.trim()) {return of ([]) ;}

    return this.http.get<Account[]>(`${this.accountsUrl}/?username=${term}`).pipe(
      tap(x => x.length ? 
        this.log(`Found Account matching "${term}"`): 
        this.log(`No Account matching "${term}"`)),
      catchError(this.handleError<Account[]>('searchAccount'))
    );
  }

  //Private Functions  
  private log(message: string){
    this.messageService.add(`AccountService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?:T){
    return (error: any) : Observable<T> => {
      
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    
    }
  }

}