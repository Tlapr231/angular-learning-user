import { Component, OnInit } from '@angular/core';
import { User } from '../users' ;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User = {
    id: 511388,
    name: "Ayden Good",
    email: "Ayden.Good@gmail.com"
    }

  constructor() { }

  ngOnInit() {
    
  }

}