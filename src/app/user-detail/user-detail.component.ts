import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { User } from "../user";
import { UserService } from "../user.service"; 

const ENTER = 13;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  subsciption: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getUser();
    
    this.subsciption = Observable.fromEvent(document, 'keypress').subscribe(e => {
      if (e.keyCode === ENTER){
        //if enter is pressed.
        console.log("Enter Key Pressed");
        this.save();
      }
    })
  }

  ngOnDestroy(){
    this.subsciption.unsubscribe();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => this.user = user)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.userService.updateUser(this.user).subscribe(() => this.goBack())
  }

  deleteAlias(index: number): void {
    //TODO
    console.log(`deleteAlias: Alias ${index} Deleted (Curently doesn't work)`);
  }
}