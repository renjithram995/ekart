import { Component, OnInit } from '@angular/core';
// import * as data from "../../data/shoes.json"
import { ShoesTestData } from "../service/shoestestdata"
import { IShoe, IFilters } from '../interfaces/shoe';
import { NgxMasonryOptions } from 'ngx-masonry';
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.sass']
})

export class HomeComponentComponent implements OnInit {

  constructor() { }

  public masonryOptions: NgxMasonryOptions  = {
    gutter: 30,
    itemSelector: '.masonry-item',
    // percentPosition: true,
    columnWidth: 200,
    // fitWidth: true,
  };
  public manageData: Array<IShoe> = ShoesTestData.manageData
  public selectedFilters: Array<IFilters> = []
  public generatedFilters: Array<IFilters> = []
  hideFilterPopup: Boolean = true

  searchText: string = ''
  ngOnInit(): void {
    this.createFilters()
  }
  createFilters () :void {
    this.generatedFilters = this.manageData.reduce((accum: IFilters[], elem: IShoe) => {
      if (!accum.find((el: IFilters) => el.value === elem.brand)) {
        accum.push({
          key: 'brand',
          value: elem.brand
        })
      }
      return accum
    }, [])
  }
  searchBoxChange(data: string): void {
  }
  popupVisiblity(value: boolean): void {
    this.hideFilterPopup = value
  }

}
