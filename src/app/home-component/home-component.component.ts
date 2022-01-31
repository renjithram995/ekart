import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoesTestData } from "../service/shoestestdata"
import { IShoe, IFilters, IgroupFilters, enumIShoeKeys } from '../interfaces/shoe';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';


enum displaySortOptions {
  modifiedDateAscending = 'newest to oldest',
  modifiedDateDescending = 'oldest to newest'
}
type sortTypes = 'modifiedDateAscending' | 'modifiedDateDescending'
@Pipe({name: 'SortingOption'})
export class SortingOption implements PipeTransform {
  transform(value: sortTypes): string {
    return displaySortOptions[value]
  }
}

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.sass']
})

export class HomeComponentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  public masonryOptions: NgxMasonryOptions  = { // options used for NgxMasonry
    gutter: 30,
    itemSelector: '.masonry-item',
    columnWidth: 200,
  };
  public manageData: Array<IShoe> = ShoesTestData.manageData
  public selectedFilters: Array<IFilters> = []
  public groupedFilters: IgroupFilters = {} as IgroupFilters
  public searchTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000)
  public sortOption: Array<sortTypes> = ['modifiedDateAscending', 'modifiedDateDescending']
  public selectedOption: sortTypes = 'modifiedDateAscending'

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  hideFilterPopup: Boolean = true

  searchText: string = ''
  ngOnInit(): void {
  }
  searchBoxChange(): void { // gets the keyup event of the searchbox
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.executeDataFiltering()
    }, 500)
  }
  popupVisiblity(value: boolean): void { // toggle filter ui
    this.hideFilterPopup = value
    if (!this.hideFilterPopup) {
      this.createFilterGroups()
    }
  }

  
  createFilterGroups(): void { // create the filters based on the data we have
    this.groupedFilters = {} as IgroupFilters
    this.manageData.forEach((ele: IShoe) => {
      const groupKeys = ['idealFor', 'price', 'category', 'color', 'brand'] as enumIShoeKeys[]
      groupKeys.forEach((key: enumIShoeKeys) => {
        if (ele[key]) {
          if (!this.groupedFilters[key]) {

            this.groupedFilters[key] = key === 'price' ? [{
              key: key,
              value: [0, 500],
              count: 0
            },{
              key: key,
              value: [500, 1000],
              count: 0
            }, {
              key: key,
              value: [1000, 1250],
              count: 0
            }, {
              key: key,
              value: [1250, 1750],
              count: 0
            }, {
              key: key,
              value: [1750, 2000],
              count: 0
            }, {
              key: key,
              value: [2000, 2250],
              count: 0
            }, {
              key: key,
              value: [2250, 2500],
              count: 0
            },
            {
              key: key,
              value: [2500, 4000],
              count: 0
            }
            ] : []
          }
          if (key === 'price') {
            const filter = this.groupedFilters[key].find((data: IFilters) => {
              const minPrice = Number((data.value as unknown as Array<number>)?.[0] || '')
              const maxPrice = Number((data.value as unknown as Array<number>)?.[1] || '')
              return minPrice < Number(ele[key]) && maxPrice > Number(ele[key])
            })
            if (filter && !ele.hidden) {
              filter.count++
            }
          } else {
            const filter = this.groupedFilters[key].find((data: IFilters) => data.value === ele[key])
            if (!filter) {
              this.groupedFilters[key].push({
                key: key,
                value: ele[key],
                count: !ele.hidden ? 1 : 0
              })
            } else {
              filter.count += !ele.hidden ? 1 : 0
            }
          }
        }
      })
    })
  }
  manageDataLength(): Number { // to display the length of visible data in UI
    return this.manageData.filter((data: IShoe) => !data.hidden).length
  }
  applyFilter(appliedFilters: Array<IFilters>): void { // function to handle all the selectedfilteres from the child
    this.selectedFilters = appliedFilters
    this.popupVisiblity(true)
    this.executeDataFiltering()
  }
  executeDataFiltering(): void { // to execute filtering operation to the data
    this.manageData = this.manageData.map((data: IShoe) => {
      const valid = !this.selectedFilters.length || this.selectedFilters.some((filter: IFilters) => {
        if (filter.key === 'price') {
          const minPrice = Number((filter.value as unknown as Array<number>)?.[0] || '')
          const maxPrice = Number((filter.value as unknown as Array<number>)?.[1] || '')
          const currentPrice = Number(data[filter.key])
          return (minPrice <= currentPrice && maxPrice >= currentPrice)
        } else {
          return data[filter.key] === filter.value
        }
      })
      data.hidden = this.searchText ? !(data.name.toLowerCase().includes(this.searchText.toLowerCase()) && valid) : !valid
      return data
    })
  }
  clearFilters(): void { // to clear all the selected filters
    this.selectedFilters = []
    this.executeDataFiltering()
  }
  toggleSort(): void { // sort based on registered date
    this.manageData = this.manageData.sort((a: IShoe, b: IShoe) => {
      const order = this.selectedOption === 'modifiedDateAscending' ? 1 : -1
      const aDate = new Date(a.registered).getTime()
      const bDate = new Date(b.registered).getTime()
      return (aDate - bDate) * order
    })
    this.reloadMasanry()
  }
  reloadMasanry(): void {
     if (this.masonry !== undefined) {
      this.masonry.reloadItems();
      this.masonry.layout();
    }
  }
  logOut(): void {
    localStorage.clear()
    this.router.navigate(['Login'], { relativeTo: this.route })
  }

}
