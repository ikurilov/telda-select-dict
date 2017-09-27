import { ElementRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SelectDictChoicesComponent } from './select-dict-choices/select-dict-choices.component';
import { ControlValueAccessor } from '@angular/forms';
import { SelectDictPipe } from './select-dict.pipe';
import { Subscription } from 'rxjs/Subscription';
export declare class SelectDictComponent implements OnInit, ControlValueAccessor {
    private eRef;
    private http;
    selected: any;
    url: any;
    indexBy: string;
    filterBy: string;
    label: string;
    placeholder: string;
    options: any;
    dictFilter: SelectDictPipe;
    focusMatch: Subject<{}>;
    focusSearch: Subject<{}>;
    items: any[];
    _items: any[];
    search: string;
    active: any;
    activeIndex: 'nextPage' | 'prevPage' | number;
    initialQuery: boolean;
    longList: boolean;
    listSize: number;
    page: number;
    allInMemory: boolean;
    lastRemoteSearch: string;
    opened: boolean;
    propagateChange: (_: any) => void;
    matchTemplate: any;
    choicesTemplate: any;
    choicesComponent: SelectDictChoicesComponent;
    clickHandler(event: any): void;
    constructor(eRef: ElementRef, http: Http);
    ngOnInit(): void;
    onSelect($event: any): void;
    onOpen($event?: any): void;
    onClose(): void;
    resetComponent(): void;
    onClear(): void;
    onSearch(value: string): void;
    searchItem(): void;
    selectHighlighted(): void;
    activateNext(): void;
    activatePrev(): void;
    request(): Subscription;
    getNextPage(): void;
    getPrevPage(): void;
    setActiveItem(direction: ('next' | 'prev')): void;
    getActiveIndex(): any;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(): void;
    needToLoadData(): boolean;
}