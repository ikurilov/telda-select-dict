import { Observable } from 'rxjs/Observable';
import { IDictListContainer } from './select-dict.component';
import { HttpClient } from '@angular/common/http';
export interface ISelectDictService {
    getPage(dictionary_name: string, params?: any): Observable<IDictListContainer>;
}
export declare class SelectDictService implements ISelectDictService {
    private http;
    constructor(http: HttpClient);
    getPage(dictionary_name: string, params?: any): Observable<IDictListContainer>;
}
