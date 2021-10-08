import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValueFilter'
})

export class keyValueFilterPipe {
  transform(value: any): any {
    return Object.keys(value).map(function(key) {
        let pair = {
          'key': key,
          'value': value[key]
        } as any;
        return pair;
    });
  }
}