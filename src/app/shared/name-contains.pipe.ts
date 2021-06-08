import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameContains'
})
export class NameContainsPipe implements PipeTransform {

  transform(value: any[], term: string = ''): any[] {
    return value.filter(x => {
      let keys = Object.keys(x);
      return keys.some(k => x[k].toLowerCase().includes(term.toLowerCase()))
    })
  }

}
