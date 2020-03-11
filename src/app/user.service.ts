import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from "./user";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private usersUrl = 'api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
    .pipe(
      tap(_ => this.log('Fetched Users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  } 

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`Fetched User id : ${id}`)),
      catchError(this.handleError<User>(`getUser id : ${id}`))
    )
  }

  updateUser (user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
      tap(_ => this.log(`Updated user id : ${user.id}`)),
      catchError(this.handleError<any>(`updateUser`))
    )
  }

  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`Added user with id : ${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted user id: ${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) { return of ([]) }

    return this.http.get<User[]>(`${this.usersUrl}/?name=${term}`).pipe(
      tap(x => x.length ? 
        this.log(`Found users matching "${term}"`):
        this.log(`No users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers'))
    );
  }

  private log(message: string){
    this.messageService.add(`UserService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any) : Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);

    }
  } 
}