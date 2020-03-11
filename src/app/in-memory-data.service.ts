import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const users = [
      {id: 11, name: "Saoirse Randolph", email: "SR@gmail.com"},
      {id: 12, name: "Ayden Good", email: "AG@gmail.com"},
      {id: 13, name: "Bella-Rose Merritt", email: "BRM@gmail.com"},
      {id: 14, name: "Eryn Marshall", email: "EM@gmail.com"},
      {id: 15, name: "Sania Hickman", email: "SH@gmail.com"},
      {id: 16, name: "Jonathon Ochoa", email: "JO@gmail.com"},
      {id: 17, name: "Arielle Werner", email: "AW@gmail.com"},
      {id: 18, name: "Abdi Whittington", email: "AWh@gmail.com"},
      {id: 19, name: "Aronas Huerta", email: "AH@gmail.com"},
      {id: 20, name: "Lilly-Rose Murray", email: "LRM@gmail.com"}
    ];
    return {users};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11; 
  }
}