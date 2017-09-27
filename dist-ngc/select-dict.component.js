import { Component, ContentChild, ElementRef, forwardRef, HostListener, Input, ViewChild } from '@angular/core';
import { findIndex } from 'lodash/array';
import { cloneDeep } from 'lodash/lang';
import { assign } from 'lodash/object';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SelectDictChoicesComponent } from './select-dict-choices/select-dict-choices.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectDictPipe } from './select-dict.pipe';
export class SelectDictComponent {
    constructor(eRef, http) {
        this.eRef = eRef;
        this.http = http;
        this.indexBy = 'id';
        this.filterBy = 'name';
        this.dictFilter = new SelectDictPipe();
        this.focusMatch = new Subject();
        this.focusSearch = new Subject();
        this.items = [];
        this._items = [];
        this.active = null;
        this.activeIndex = -1;
        this.initialQuery = true;
        this.longList = false;
        this.listSize = 50;
        this.page = 0;
        this.allInMemory = false;
        this.opened = false;
        this.propagateChange = (_) => {
        };
    }
    clickHandler(event) {
        if (!this.eRef.nativeElement.contains(event.target) && this.opened) {
            this.onClose();
        }
    }
    ngOnInit() {
    }
    onSelect($event) {
        this.selected = $event.item;
        this.propagateChange(this.selected);
        this.onClose();
    }
    onOpen($event) {
        this.opened = true;
        this.active = this.selected;
        this.request();
    }
    onClose() {
        this.opened = false;
        this.resetComponent();
    }
    resetComponent() {
        this.items = [];
        this.active = null;
        this.activeIndex = -1;
        this.page = 0;
        this.search = '';
        this.focusMatch.next();
    }
    onClear() {
    }
    onSearch(value) {
        if (this.search !== value) {
            this.search = value;
            this.searchItem();
        }
    }
    searchItem() {
        this.page = 0;
        if (this.needToLoadData())
            this.request();
        else {
            this.items = this.dictFilter.transform(this._items, this.filterBy, this.search);
            if (this.active) {
                this.activeIndex = this.getActiveIndex();
            }
            else {
                this.activeIndex = -1;
            }
        }
    }
    selectHighlighted() {
        if (this.activeIndex === 'prevPage') {
            this.getPrevPage();
        }
        else if (this.activeIndex === 'nextPage') {
            this.getNextPage();
        }
        else {
            this.onSelect({ $event: null, item: this.active });
        }
    }
    activateNext() {
        this.setActiveItem('next');
    }
    activatePrev() {
        this.setActiveItem('prev');
    }
    request() {
        let params = {
            [this.filterBy]: this.search,
            count: this.listSize,
            from: this.page * this.listSize
        };
        assign(params, this.options);
        return this.http.get(this.url, { withCredentials: true, params })
            .map(result => result.json())
            .subscribe((container) => {
            if (this.initialQuery) {
                this.initialQuery = false;
                this.longList = container.total < 0 || container.total > container.size;
            }
            this._items = container.list;
            this.items = cloneDeep(this._items);
            this.lastRemoteSearch = params[this.filterBy];
            this.allInMemory = this.page === 0 && container.size < this.listSize;
            this.activeIndex = this.active ? this.getActiveIndex() : -1;
            this.choicesComponent.scrollToTop();
            this.choicesComponent._ensureHighlightVisible();
        });
    }
    getNextPage() {
        this.page++;
        this.focusSearch.next();
        this.request();
    }
    getPrevPage() {
        this.page--;
        this.focusSearch.next();
        this.request();
    }
    setActiveItem(direction) {
        let itemsLength = this.items.length;
        if (this.activeIndex === -1) {
            if (this.longList && this.page !== 0) {
                this.activeIndex = 'prevPage';
            }
            else if (itemsLength) {
                this.activeIndex = 0;
            }
        }
        else {
            // previous item
            if (direction === 'prev') {
                if (typeof this.activeIndex !== 'string') {
                    if (this.activeIndex !== 0) {
                        this.activeIndex--;
                    }
                    else if (this.longList && this.page !== 0) {
                        this.activeIndex = 'prevPage';
                    }
                }
                else if (this.activeIndex === 'nextPage') {
                    this.activeIndex = itemsLength - 1;
                }
            }
            else {
                if (typeof this.activeIndex !== 'string') {
                    if (this.activeIndex !== itemsLength - 1) {
                        this.activeIndex++;
                    }
                    else if (this.longList && !(itemsLength < this.listSize)) {
                        this.activeIndex = 'nextPage';
                    }
                }
                else if (this.activeIndex === 'prevPage') {
                    this.activeIndex = 0;
                }
            }
        }
        this.active = this.activeIndex !== -1 && typeof this.activeIndex !== 'string' ? this.items[this.activeIndex] : null;
    }
    getActiveIndex() {
        return findIndex(this.items, item => item[this.indexBy] === this.active[this.indexBy]);
    }
    writeValue(value) {
        this.selected = value;
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() {
    }
    needToLoadData() {
        if (this.longList) {
            return !this.allInMemory || this.search.indexOf(this.lastRemoteSearch) === -1;
        }
        return false;
    }
    ;
}
SelectDictComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-select-dict',
                template: "<div class=\"form-group\"> <label>{{label}}</label> <div class=\"select-dict dropdown\"> <div class=\"form-control dropdown-toggle hide-overflowed-text\" tabindex=\"0\" appSelectMatch [focus]=\"focusMatch\" [hidden]=\"opened\" (keydown.enter)=\"onOpen()\" (click)=\"onOpen($event)\"> <ng-template *ngIf=\"selected\" [ngTemplateOutlet]=\"matchTemplate\" [ngOutletContext]=\"{$implicit: selected}\"> </ng-template> <span *ngIf=\"!selected\">{{placeholder || label}}</span> </div> <input *ngIf=\"opened\" #searchInput class=\"form-control\" appSelectSearch [focus]=\"focusSearch\" (keyup)=\"onSearch(searchInput.value)\" (keydown.enter)=\"selectHighlighted()\" (keydown.arrowup)=\"activatePrev()\" (keydown.arrowdown)=\"activateNext()\"> <app-select-dict-choices *ngIf=\"opened\" [choices]=\"items\" [indexBy]=\"indexBy\" [search]=\"search\" [showPreviousPageButton]=\"longList && page !== 0\" [showNextPageButton]=\"longList && !(items?.length < listSize)\" [active]=\"active\" [activeIndex]=\"activeIndex\" [template]=\"choicesTemplate\" (onSelect)=\"onSelect($event)\" (nextPage)=\"getNextPage()\" (prevPage)=\"getPrevPage()\" ></app-select-dict-choices> </div> </div> ",
                styles: [".select-dict div.form-control { cursor: pointer; padding-right: 38px; overflow-x: hidden; } .select-dict .dropdown-toggle:after { position: absolute; top: 17px; right: 15px; } .select-dict .hide-overflowed-text { overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap; } "],
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => SelectDictComponent),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
SelectDictComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: Http, },
];
SelectDictComponent.propDecorators = {
    'selected': [{ type: Input },],
    'url': [{ type: Input },],
    'indexBy': [{ type: Input },],
    'filterBy': [{ type: Input },],
    'label': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'options': [{ type: Input },],
    'matchTemplate': [{ type: ContentChild, args: ['selectMatch',] },],
    'choicesTemplate': [{ type: ContentChild, args: ['selectChoices',] },],
    'choicesComponent': [{ type: ViewChild, args: [SelectDictChoicesComponent,] },],
    'clickHandler': [{ type: HostListener, args: ['document:click', ['$event'],] },],
};
//# sourceMappingURL=select-dict.component.js.map