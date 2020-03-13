import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Location } from '@angular/common';

import { MessageService } from "../message.service";
import { User } from '../user';
import { UserService } from "../user.service";

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent {
  //variables
  users: User[];

  //From information
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  //Constructor and Init
  constructor(
  private messageService: MessageService,
  private fb: FormBuilder,
  private userService: UserService,
  private location: Location) { }

  ngOnInit() {
    this.getUsers();
  }

  //Submitting the form
  onSubmit() {

    if (this.userForm.valid){
      this.messageService.add(`Form is Valid`);
    } else {
      this.messageService.add(`Form is Invalid`);
    }

  }

  onClickSubmit(){

    if (this.userForm.valid){

      const user:  User = {
        name: this.name.value.trim(),
        email: this.email.value.trim(),
        street: this.street.value.trim(),
        city: this.city.value.trim(),
        state: this.state.value.trim(),
        zip: this.zip.value.trim(),
        aliases: this.aliases.value
      };

      this.add(user);

      console.log(user);
      this.messageService.add(`userEditor: ${this.userForm.value.name} has been created`);
      this.onSubmit();
      this.goBack();
    }

  }

  //User Management (Adding Users)
  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }
  
  add(user: User): void {
    this.userService.addUser(user as User).subscribe(user => {        
      this.users.push(user);
    });
  }

  //Aliases

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  deleteAlias(index: number){
    this.aliases.removeAt(index);
  }

  goBack(): void {
    this.location.back();
    console.log("closing");
  }

  //Getters
  get name() { return this.userForm.get("name"); }
  get email() { return this.userForm.get("email"); }
  get street() { return this.userForm.get("address").get("street"); }
  get city() { return this.userForm.get("address").get("city"); }
  get state() { return this.userForm.get("address").get("state"); }
  get zip() { return this.userForm.get("address").get("zip"); }
  get aliases() { return this.userForm.get('aliases') as FormArray; }
}