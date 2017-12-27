import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IDictListContainer} from './select-dict.component';
import {HttpClient} from '@angular/common/http';

export interface ISelectDictService {
  getPage(dictionary_name: string, params?: any): Observable<IDictListContainer>
}

@Injectable()
export class SelectDictService implements ISelectDictService {

  constructor(private http: HttpClient) {
  }

  getPage(dictionary_name: string, params?: any) {
    const options = {
      withCredentials: true,
      params
    };
    return <Observable<IDictListContainer>>this.http.get(dictionary_name, options)
  }
}
