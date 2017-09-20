import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'selectDict'
})
export class SelectDictPipe implements PipeTransform {
  initialQuery = true;
  longDict = false;
  prevFilter = '';
  prevPage = 1;
  allInMemory = false;

  needToLoadData(search, params) {
    if (!search) {
      search = '';
    }
    if (this.initialQuery || this.prevPage !== params.pageNumber) {
      return true;
    }
    if (!this.longDict) {
      return false;
    }

    if (search === this.prevFilter) {
      return false;
    }
    else if (this.allInMemory && search.indexOf(this.prevFilter) !== -1) {
      // if all items in memory and current filter includes last remote(!) filter
      return false;
    }
    else {
      params.pageNumber = 1;
      return true;
    }

  };

  request() {

  }


  transform(value: any, args?: any): any {
    return null;
  }

}
