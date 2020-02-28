import { Component, OnInit } from '@angular/core';
import { Hero } from '../user' ;

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