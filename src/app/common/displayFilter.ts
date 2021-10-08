import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayFilter'
})

export class displayFilterPipe {
  transform(value: string | number | boolean | Array<Number>): any {
      return Array.isArray(value) ? 'Rs.' + value[0] + ' to ' + value[1] : value
  }
}