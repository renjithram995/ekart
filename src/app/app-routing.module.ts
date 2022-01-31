import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './login/login.component';
import { AuthenticateLogin } from './service/routeauthenticator';


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
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
