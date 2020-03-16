import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  loginForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required], //Going to need validation on this to make sure there are no duplicates
    password: ['', [Validators.required, Validators.minLength(4)]]
  })

 onSubmit() {

    if (this.loginForm.valid){
      console.log(`Form is Valid`);
    } else {
      console.log(`Form is Invalid`);
    }

  }

  ngOnInit() {
  }

  //Getters

  get name() { return this.loginForm.get('name'); }
  get username() { return this.loginForm.get('username'); }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

}