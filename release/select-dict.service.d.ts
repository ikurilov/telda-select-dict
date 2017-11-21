import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IDictListContainer } from './select-dict.component';
export interface ISelectDictService {
    getPage(dictionary_name: string, params?: any): Observable<IDictListContainer>;
}
export declare class SelectDictService implements ISelectDictService {
    private http;
    constructor(http: Http);
    getPage(dictionary_name: string, params?: any): Observable<any>;
}
