import { AfterViewChecked, ElementRef, EventEmitter, OnChanges, OnInit, TemplateRef } from '@angular/core';
export declare class SelectDictChoicesComponent implements OnChanges, OnInit, AfterViewChecked {
    private ref;
    template: TemplateRef<any>;
    choices: any[];
    active: any;
    activeIndex: any;
    showNextPageButton: boolean;
    showPreviousPageButton: boolean;
    search: any;
    indexBy: any;
    onSelect: EventEmitter<{}>;
    nextPage: EventEmitter<{}>;
    prevPage: EventEmitter<{}>;
    dropDownMenuElem: any;
    constructor(ref: ElementRef);
    ngOnInit(): void;
    selectItem($event: any, item: any): void;
    _ensureHighlightVisible(): void;
    scrollToTop(): void;
    trackByDictionary(index: any, item: any): any;
    getNextPage(): void;
    getPrevPage(): void;
    ngOnChanges(changesObj: any): void;
    ngAfterViewChecked(): void;
    ngDoCheck(): void;
}
