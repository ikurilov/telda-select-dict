import {Injectable} from '@angular/core';
import {assign} from 'lodash/object'
import {SelectDictService} from '../lib/select-dict.service';
import {Http} from '@angular/http';

@Injectable()
export class CustomDictService extends SelectDictService {
  url = 'http://172.16.6.184:8080/bti/rest/dict/';

  constructor(http: Http) {
    super(http);
  }

  getPage(dictionary_name: string, params?: any) {
    return super.getPage(this.url + dictionary_name, params);
  }
}
