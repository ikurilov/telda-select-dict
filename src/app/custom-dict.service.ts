import {Injectable} from '@angular/core';
import {SelectDictService} from '../../release';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CustomDictService extends SelectDictService {
  url = 'http://172.16.6.184:8080/bti/rest/dict/';

  constructor(http: HttpClient) {
    super(http);
  }

  getPage(dictionary_name: string, params?: any) {
    return super.getPage(this.url + dictionary_name, params);
  }
}
