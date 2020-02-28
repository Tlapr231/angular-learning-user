import { Component, OnInit } from '@angular/core';
import { User } from '../users' ;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user = 'Shayne George';

  constructor() { }

  ngOnInit() {
    
  }

}