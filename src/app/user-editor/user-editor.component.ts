import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MessageService } from "../message.service";

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent {

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });

  constructor(
  private messageService: MessageService) { }

  updateName() {
  }

  onSubmit() {
    // this.messageService.add(`userEditor ${this.userForm.value}`);
    console.warn(this.userForm.value);
  }
}