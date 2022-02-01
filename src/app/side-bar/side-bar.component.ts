import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

interface icons {
  routerLink: string;
  icon: string;
}
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent {
  
  selectedNav = '/'
  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      // Handle route change
      if (event instanceof NavigationEnd) {
        this.selectedNav = event.url.toLowerCase()
      }
  });
  }
  public icons: icons[] = [
    {
      routerLink: '',
      icon: 'logo'
    }, 
    {
      routerLink: '/userlist',
      icon: 'user'
    }, 
    {
      routerLink: '/',
      icon: 'icon-1'
    }, 
    {
      routerLink: '',
      icon: 'icon-2'
    }, 
    {
      routerLink: '',
      icon: 'icon-3'
    }
  ]

}
