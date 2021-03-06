import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { MessagesComponent } from './messages/messages.component';
import { UserService } from './user.service';
import { MessageService } from './message.service';

import { HelloComponent } from './hello.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { SignupComponent } from './signup/signup.component';
import { AccountService } from './account.service';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    HttpClientModule, 
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    ReactiveFormsModule
  ],
  declarations: [ 
    AppComponent, 
    DashboardComponent, 
    UsersComponent, 
    UserDetailComponent, 
    MessagesComponent, 
    UserSearchComponent, 
    HelloComponent, 
    UserEditorComponent, 
    SignupComponent, 
    AccountDetailComponent, 
    SigninComponent 
  ],
  bootstrap:    [ AppComponent ],
  providers: [ UserService, MessageService, InMemoryDataService, AccountService ]
})

export class AppModule { }