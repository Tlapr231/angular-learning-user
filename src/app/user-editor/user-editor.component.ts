import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { MessageService } from "../message.service";

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent {
  
  constructor(
  private messageService: MessageService,
  private fb: FormBuilder) { }

  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
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

  get aliases() {
    return this.userForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  deleteAlias(index: number){
    this.aliases.removeAt(index);
  }

  onSubmit() {
    this.messageService.add(`userEditor ${this.userForm.value.firstName} ${this.userForm.value.lastName} as been created`);
    // console.warn(this.userForm.value);
  }
}