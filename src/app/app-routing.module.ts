import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './login/login.component';
import { CanActivateTeam } from './service/routeauthenticator';


const routes: Routes = [
  {
    path: '',
    component: HomeComponentComponent,
    pathMatch: 'full',
    canActivate: [CanActivateTeam]
  },
  {
    path: 'Login',
    component: LoginComponent,
    canActivate: [CanActivateTeam]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
