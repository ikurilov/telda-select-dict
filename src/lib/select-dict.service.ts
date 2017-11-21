import {Injectable} from '@angular/core';
import {assign} from 'lodash/object'
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IDictListContainer} from './select-dict.component';

export interface ISelectDictService {
  getPage(dictionary_name: string, params?: any): Observable<IDictListContainer>
}

@Injectable()
export class SelectDictService implements ISelectDictService {

  constructor(private http: Http) {
  }

  getPage(dictionary_name: string, params?: any) {
    const options = {
      withCredentials: true,
      params
    };
    return this.http.get(dictionary_name, options).map(result => result.json())
  }
}
