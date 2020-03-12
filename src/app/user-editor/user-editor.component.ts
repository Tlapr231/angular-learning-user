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
    const user:  User = {
      name: this.userForm.get("name").value.trim(),
      email: this.userForm.get("email").value.trim(),
      street: this.userForm.get("address").get("street").value.trim(),
      city: this.userForm.get("address").get("city").value.trim(),
      state: this.userForm.get("address").get("state").value.trim(),
      zip: this.userForm.get("address").get("zip").value.trim(),
      aliases: this.userForm.get("aliases").value
    };

    this.add(user);

    console.log(user);
    this.messageService.add(`userEditor: ${this.userForm.value.name} has been created`);
    
    //TODO known bug where onSubmit is triggered when "Add Alias" is Clicked
    this.goBack();
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
  get aliases() {
    return this.userForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  deleteAlias(index: number){
    this.aliases.removeAt(index);
  }

  goBack(): void {
    this.location.back();
  }
}