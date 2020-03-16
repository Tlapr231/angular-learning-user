import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { User } from './user';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
//TODO Rrmodel database
  createDb() {
    const users = [
      {id: 11, name: "Saoirse Randolph", email: "SR@gmail.com", street: "737 E. Marsh St.", city: "Trenton", state: "NJ", zip: "08610", aliases: ["SaRa", "Sorrow"]},
      {id: 12, name: "Ayden Good", email: "AG@gmail.com", street: "57 Ashley Rd.", city: "Winter Park", state: "FL", zip: "32792"},
      {id: 13, name: "Bella-Rose Merritt", email: "BRM@gmail.com", street: "22 Stonybrook Rd.", city: "Burke", state: "VA", zip: "22015"},
      {id: 14, name: "Eryn Marshall", email: "EM@gmail.com", street: "9832 Armstrong Lane", city: "Falls Church", state: "VA", zip: "22041"},
      {id: 15, name: "Sania Hickman", email: "SH@gmail.com", street: "8481 West Oxford St.", city: "Macomb", state: "MI", zip: "48042"},
      {id: 16, name: "Jonathon Ochoa", email: "JO@gmail.com", street: "530 Parker Ave.", city: "Pueblo", state: "CO", zip: "81001"},
      {id: 17, name: "Arielle Werner", email: "AW@gmail.com", street: "8936 High Ridge Street", city: "Bartlett", state: "IL", zip: "60103"},
      {id: 18, name: "Abdi Whittington", email: "AWh@gmail.com", street: "966 Fairview Drive", city: "Mentor", state: "OH", zip: "44060"},
      {id: 19, name: "Aronas Huerta", email: "AH@gmail.com", street: "7133 Galvin St.", city: "Enfield", state: "CT", zip: "06082"},
      {id: 20, name: "Lilly-Rose Murray", email: "LRM@gmail.com", street: "14 Cobblestone Dr.", city: "Clover", state: "SC", zip: "29710"},
    ];

    const accounts = [
      {id: 11, name: 'Admin Istrator', email: 'Admin@foo.com', password: 'adminpass'},
      {id: 12, name: 'Thierry Laprade', email: 'thierry.laprade@gmail.com', password: 'password123'}
    ];
    return {users, accounts};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11; 
  }
}