import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent, SortingOption } from './home-component/home-component.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { FilterComponentComponent } from './home-component/filter-component/filter-component.component';
import { keyValueFilterPipe } from './common/objectTransform';
import { displayFilterPipe } from './common/displayFilter';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptors } from './service/httpinterceptors';
import { AuthenticateLogin } from './service/routeauthenticator';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    SideBarComponent,
    FilterComponentComponent,
    keyValueFilterPipe,
    displayFilterPipe,
    LoginComponent,
    SortingOption,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMasonryModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptors,
    multi: true,
  }, AuthenticateLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }
