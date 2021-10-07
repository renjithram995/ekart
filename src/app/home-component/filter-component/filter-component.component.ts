import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilters } from 'src/app/interfaces/shoe';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.sass']
})
export class FilterComponentComponent implements OnInit {

  @Input()  filterlists: Array<IFilters> = [];
  @Output() activefilter = new EventEmitter<IFilters>();
  @Output() closepopup = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }
  closePopup(): void {
    this.closepopup.emit(true)
  }

}
