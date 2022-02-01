import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './login/login.component';
import { AuthenticateLogin } from './service/routeauthenticator';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponentComponent,
    pathMatch: 'full',
    canActivate: [AuthenticateLogin]
  },
  {
    path: 'Login',
    component: LoginComponent,
    canActivate: [AuthenticateLogin]
  },
  {
    path: 'userlist',
    component: UserListComponent,
    pathMatch: 'full',
    canActivate: [AuthenticateLogin]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
