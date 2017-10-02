import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'selectDict'
})
export class SelectDictPipe implements PipeTransform {

  transform(value: any[], prop, search): any {
    return value.filter((item) => item[prop].toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }

}
