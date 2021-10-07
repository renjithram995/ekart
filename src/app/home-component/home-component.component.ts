import { Component, OnInit } from '@angular/core';
// import * as data from "../../data/shoes.json"
import { ShoesTestData } from "../service/shoestestdata"
import { IShoe, IFilters } from '../interfaces/shoe';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.sass']
})

export class HomeComponentComponent implements OnInit {

  constructor() { }
  public manageData: Array<IShoe> = ShoesTestData.manageData
  public filter: Array<IFilters> = []
  searchText: string = ''
  ngOnInit(): void {
    debugger
    this.filter = this.manageData.reduce((accum: IFilters[], elem: IShoe) => {
      if (elem.brand && !accum.find((el: IFilters) => el.value === elem.brand)) {
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

}
