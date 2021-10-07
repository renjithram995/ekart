import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent implements OnInit {

  constructor() { }
  public icons = ['logo', 'user', 'icon-1', 'icon-2', 'icon-3']
  selectedNav = 'icon-1'
  ngOnInit(): void {
  }

}
