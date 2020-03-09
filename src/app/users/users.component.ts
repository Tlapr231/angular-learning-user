import { Component, OnInit } from '@angular/core';
import { User } from '../users' ;
import { USERS } from "../mock-users";
import { UserService } from "../user.service";
import { MessageService } from "../message.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  selectedUser: User;
  users: User[];

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: User):  void {
    this.selectedUser = user;
    this.messageService.add('UserService: Selected user id : ' + user.id);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

}