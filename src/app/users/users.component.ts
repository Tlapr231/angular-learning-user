import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../users' ;
import { UserService } from "../user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
}) 

export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  add(user: User): void {
    this.userService.addUser({ name } as User).subscribe(user => {        
      this.users.push(user);
    });
  }

  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
  }

}