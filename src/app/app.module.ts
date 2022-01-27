import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { FilterComponentComponent } from './home-component/filter-component/filter-component.component';
import { keyValueFilterPipe } from './common/objectTransform';
import { displayFilterPipe } from './common/displayFilter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    SideBarComponent,
    FilterComponentComponent,
    keyValueFilterPipe,
    displayFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMasonryModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
