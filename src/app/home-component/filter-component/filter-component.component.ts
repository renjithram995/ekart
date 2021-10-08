import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IgroupFilters, IFilters } from 'src/app/interfaces/shoe';

type IgroupFilterKeys = keyof IgroupFilters
@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.sass']
})
export class FilterComponentComponent implements OnInit {

  @Input()  groupedFilters: IgroupFilters = {} as IgroupFilters;
  @Output() activefilters = new EventEmitter<Array<IFilters>>();
  @Output() closepopup = new EventEmitter<boolean>();
  hgt = { height: 100 + 'px' }
  
  constructor() { }

  ngOnInit(): void {
  }
  closePopup(): void {
    this.closepopup.emit(true)
  }
  clearAll(): void {
    for (const key in this.groupedFilters) {
      this.groupedFilters[key as IgroupFilterKeys] = this.groupedFilters[key as IgroupFilterKeys].map((filter: IFilters) => {
        filter.selected = false
        return filter
      })
    }
  }
  applyButtonClick(): void {
    let selectedFilters: Array<IFilters> = []
    for (const key in this.groupedFilters) {
      selectedFilters = [...selectedFilters, ...this.groupedFilters[key as IgroupFilterKeys].filter((filter: IFilters) => filter.selected)]
    }
    this.activefilters.emit(selectedFilters)
  }
  dynamicHeight(arrayLength: Number): string {
    return (Number(((Number(arrayLength)) / 2).toFixed()) * 36) + 'px'
  }

}
