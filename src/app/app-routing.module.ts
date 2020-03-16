import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { SignupComponent } from './signup/signup.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'userform', component: UserEditorComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'account/:id', component: AccountDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }