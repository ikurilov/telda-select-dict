import { Directive, ElementRef, Input, Renderer2, Pipe, Component, EventEmitter, Output, Injectable, ContentChild, forwardRef, HostListener, ViewChild, NgModule } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { findIndex } from 'lodash/array';
import { cloneDeep } from 'lodash/lang';
import { assign } from 'lodash/object';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HighlightChoiceDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.appHighlightChoice && changes.appHighlightChoice.currentValue) {
            this.renderer.addClass(this.el.nativeElement, 'highlighted');
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, 'highlighted');
        }
    }
}
HighlightChoiceDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appHighlightChoice]'
            },] },
];
/** @nocollapse */
HighlightChoiceDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
HighlightChoiceDirective.propDecorators = {
    "appHighlightChoice": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectDictPipe {
    /**
     * @param {?} value
     * @param {?} prop
     * @param {?} search
     * @return {?}
     */
    transform(value, prop, search) {
        return value.filter((item) => item[prop].toLowerCase().indexOf(search.toLowerCase()) !== -1);
    }
}
SelectDictPipe.decorators = [
    { type: Pipe, args: [{
                name: 'selectDict'
            },] },
];
/** @nocollapse */
SelectDictPipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectMatchDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.focus.subscribe(() => {
            setTimeout(() => this.el.nativeElement.focus());
        });
    }
}
SelectMatchDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appSelectMatch]'
            },] },
];
/** @nocollapse */
SelectMatchDirective.ctorParameters = () => [
    { type: ElementRef, },
];
SelectMatchDirective.propDecorators = {
    "focus": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectDictChoicesComponent {
    /**
     * @param {?} ref
     */
    constructor(ref) {
        this.ref = ref;
        this.onSelect = new EventEmitter();
        this.nextPage = new EventEmitter();
        this.prevPage = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dropDownMenuElem = this.ref.nativeElement.querySelector('.dropdown-menu');
    }
    /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    selectItem($event, item) {
        this.onSelect.emit({ $event, item });
    }
    /**
     * @return {?}
     */
    _ensureHighlightVisible() {
        const /** @type {?} */ choices = this.dropDownMenuElem.querySelectorAll('.choice');
        if (!choices.length)
            return;
        let /** @type {?} */ highlightedChoice;
        if (this.activeIndex === 'prevPage') {
            highlightedChoice = this.dropDownMenuElem.querySelector('.previous-page');
        }
        else if (this.activeIndex === 'nextPage') {
            highlightedChoice = this.dropDownMenuElem.querySelector('.next-page');
        }
        else if (this.activeIndex !== -1) {
            highlightedChoice = choices[this.activeIndex];
        }
        else {
            this.scrollToTop();
            return;
        }
        const /** @type {?} */ posY = highlightedChoice.offsetTop + highlightedChoice.clientHeight - this.dropDownMenuElem.scrollTop;
        const /** @type {?} */ height = this.dropDownMenuElem.offsetHeight;
        if (posY > height) {
            this.dropDownMenuElem.scrollTop += posY - height;
        }
        else if (posY < highlightedChoice.clientHeight) {
            if (this.activeIndex === 0) {
                this.dropDownMenuElem.scrollTop = 0; //To make group header visible when going all the way up
            }
            else {
                this.dropDownMenuElem.scrollTop -= highlightedChoice.clientHeight - posY;
            }
        }
    }
    /**
     * @return {?}
     */
    scrollToTop() {
        this.dropDownMenuElem.scrollTop = 0;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByDictionary(index, item) {
        return item ? item[this.indexBy] : null;
    }
    /**
     * @return {?}
     */
    getNextPage() {
        this.nextPage.emit();
    }
    /**
     * @return {?}
     */
    getPrevPage() {
        this.prevPage.emit();
    }
    /**
     * @param {?} changesObj
     * @return {?}
     */
    ngOnChanges(changesObj) {
        if (changesObj.activeIndex && changesObj.choices) {
            setTimeout(() => this._ensureHighlightVisible());
        }
        else if (changesObj.activeIndex && !changesObj.choices) {
            this._ensureHighlightVisible();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
    }
}
SelectDictChoicesComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-select-dict-choices',
                template: `<div class="dropdown-menu show"
     style="position: absolute;
       transform: translate3d(0, 38px, 0);
       top: 0;
       left: 0;
       will-change: transform;">
  <a class="dropdown-item previous-page"
     [ngClass]="{'highlighted':this.activeIndex === 'prevPage'}"
     [hidden]="!showPreviousPageButton"
     (click)="getPrevPage()"><<<</a>
  <a class="dropdown-item choice hide-overflowed-text"
     [appHighlightChoice]="i === activeIndex"
     *ngFor="let item of choices; trackBy: trackByDictionary; let i = index"
     (click)="selectItem($event, item)">
    <ng-template
      [ngTemplateOutlet]="template"
      [ngTemplateOutletContext]="{$implicit: item}">
    </ng-template>
  </a>
  <a class="dropdown-item next-page"
     [hidden]="!showNextPageButton"
     [ngClass]="{'highlighted':this.activeIndex === 'nextPage'}"
     (click)="getNextPage()">>>></a>
</div>
`,
                styles: [`:host(.sm) .dropdown-menu{
  font-size:0.875rem;
  line-height:1.5;
}

:host(.sm) .dropdown-item{
  padding:0.25rem 0.75rem;
}

:host(.active){
  border-width:3px;
}

:host{
  display:block;
}

.dropdown-menu{
  width:100%;
  max-height:200px;
  margin-bottom:10px;
  overflow-y:auto;
  padding:0.2rem 0;
}

.dropdown-item{
  padding:0.5rem 0.75rem;
  cursor:pointer;
  overflow-x:hidden;
}

.dropdown-item:active{
  color:white !important;
}

.dropdown-item.highlighted, .dropdown-item.highlighted:hover{
  background-color:#007bff;
  color:#fff !important;
}
`]
            },] },
];
/** @nocollapse */
SelectDictChoicesComponent.ctorParameters = () => [
    { type: ElementRef, },
];
SelectDictChoicesComponent.propDecorators = {
    "template": [{ type: Input },],
    "choices": [{ type: Input },],
    "active": [{ type: Input },],
    "activeIndex": [{ type: Input },],
    "showNextPageButton": [{ type: Input },],
    "showPreviousPageButton": [{ type: Input },],
    "search": [{ type: Input },],
    "indexBy": [{ type: Input },],
    "onSelect": [{ type: Output },],
    "nextPage": [{ type: Output },],
    "prevPage": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectSearchDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.focus)
            return;
        this.focusElement();
        this.focus.subscribe(() => this.focusElement());
    }
    /**
     * @return {?}
     */
    focusElement() {
        setTimeout(() => this.el.nativeElement.focus());
    }
}
SelectSearchDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appSelectSearch]'
            },] },
];
/** @nocollapse */
SelectSearchDirective.ctorParameters = () => [
    { type: ElementRef, },
];
SelectSearchDirective.propDecorators = {
    "focus": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class SelectDictService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} dictionary_name
     * @param {?=} params
     * @return {?}
     */
    getPage(dictionary_name, params) {
        const /** @type {?} */ options = {
            withCredentials: true,
            params
        };
        return /** @type {?} */ (this.http.get(dictionary_name, options));
    }
}
SelectDictService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SelectDictService.ctorParameters = () => [
    { type: HttpClient, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class SelectDictComponent {
    /**
     * @param {?} eRef
     * @param {?} dictService
     */
    constructor(eRef, dictService) {
        this.eRef = eRef;
        this.dictService = dictService;
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
    /**
     * @param {?} event
     * @return {?}
     */
    clickHandler(event) {
        let /** @type {?} */ selectDictContainer = this.eRef.nativeElement.querySelector('.select-dict');
        if (!selectDictContainer.contains(event.target) && this.opened) {
            this.onClose();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSelect($event) {
        this.selected = $event.item;
        this.propagateChange(this.selected);
        this.onClose();
    }
    /**
     * @param {?=} $event
     * @return {?}
     */
    onOpen($event) {
        this.opened = true;
        this.active = this.selected;
        this.request();
    }
    /**
     * @return {?}
     */
    onClose() {
        this.opened = false;
        this.resetComponent();
    }
    /**
     * @return {?}
     */
    resetComponent() {
        this.items = [];
        this.active = null;
        this.activeIndex = -1;
        this.page = 0;
        this.search = '';
        this.focusMatch.next();
    }
    /**
     * @return {?}
     */
    onClear() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onSearch(value) {
        if (this.search !== value) {
            this.search = value;
            this.searchItem();
        }
    }
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    activateNext() {
        this.setActiveItem('next');
    }
    /**
     * @return {?}
     */
    activatePrev() {
        this.setActiveItem('prev');
    }
    /**
     * @return {?}
     */
    request() {
        let /** @type {?} */ params = {
            [this.filterBy]: this.search ? this.search : '',
            count: this.listSize,
            from: this.page * this.listSize
        };
        assign(params, this.options);
        return this.dictService.getPage(this.url, params)
            .subscribe((container) => {
            if (this.initialQuery) {
                this.initialQuery = false;
                this.longList = container.total < 0 || container.total > container.size;
            }
            this._items = container.list;
            this.items = cloneDeep(this._items);
            this.lastRemoteSearch = /** @type {?} */ (params[this.filterBy]);
            this.allInMemory = this.page === 0 && container.size < this.listSize;
            this.activeIndex = this.active ? this.getActiveIndex() : -1;
            this.choicesComponent.scrollToTop();
            this.choicesComponent._ensureHighlightVisible();
        });
    }
    /**
     * @return {?}
     */
    getNextPage() {
        this.page++;
        this.focusSearch.next();
        this.request();
    }
    /**
     * @return {?}
     */
    getPrevPage() {
        this.page--;
        this.focusSearch.next();
        this.request();
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    setActiveItem(direction) {
        let /** @type {?} */ itemsLength = this.items.length;
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
    /**
     * @return {?}
     */
    getActiveIndex() {
        return findIndex(this.items, item => item[this.indexBy] === this.active[this.indexBy]);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.selected = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @return {?}
     */
    registerOnTouched() {
    }
    /**
     * @return {?}
     */
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
                template: `<div *ngIf="label" class="form-group">
  <label>{{label}}</label>
  <div class="select-dict dropdown">
    <div class="form-control dropdown-toggle hide-overflowed-text"
         [ngClass]="size === 'sm' ? 'form-control-sm' : ''"
         tabindex="0"
         appSelectMatch
         [focus]="focusMatch"
         [hidden]="opened"
         (keydown.enter)="onOpen()"
         (click)="onOpen($event)">
      <ng-template *ngIf="selected"
                   [ngTemplateOutlet]="matchTemplate"
                   [ngTemplateOutletContext]="{$implicit: selected}">
      </ng-template>
      <span *ngIf="!selected">{{placeholder || label}}</span>
    </div>
    <input
      *ngIf="opened"
      #searchInput
      class="form-control search-input"
      [ngClass]="size === 'sm' ? 'form-control-sm' : ''"
      appSelectSearch
      [focus]="focusSearch"
      (keyup)="onSearch(searchInput.value)"
      (keydown.enter)="selectHighlighted()"
      (keydown.arrowup)="activatePrev()"
      (keydown.arrowdown)="activateNext()">
    <app-select-dict-choices
      *ngIf="opened"
      [choices]="items"
      [indexBy]="indexBy"
      [search]="search"
      [showPreviousPageButton]="longList && page !== 0"
      [showNextPageButton]="longList && !(items?.length < listSize)"
      [active]="active"
      [activeIndex]="activeIndex"
      [template]="choicesTemplate"
      (onSelect)="onSelect($event)"
      (nextPage)="getNextPage()"
      (prevPage)="getPrevPage()"
    ></app-select-dict-choices>
  </div>
</div>
<div *ngIf="label === undefined || label === null" class="select-dict dropdown">
  <div class="form-control dropdown-toggle hide-overflowed-text"
       [ngClass]="size === 'sm' ? 'form-control-sm' : ''"
       tabindex="0"
       appSelectMatch
       [focus]="focusMatch"
       [hidden]="opened"
       (keydown.enter)="onOpen()"
       (click)="onOpen($event)">
    <ng-template *ngIf="selected"
                 [ngTemplateOutlet]="matchTemplate"
                 [ngTemplateOutletContext]="{$implicit: selected}">
    </ng-template>
    <div class="placeholder" *ngIf="!selected">{{placeholder || label}}</div>
  </div>
  <input
    *ngIf="opened"
    #searchInput
    class="form-control search-input"
    [ngClass]="size === 'sm' ? 'form-control-sm' : ''"
    appSelectSearch
    [focus]="focusSearch"
    (keyup)="onSearch(searchInput.value)"
    (keydown.enter)="selectHighlighted()"
    (keydown.arrowup)="activatePrev()"
    (keydown.arrowdown)="activateNext()">
  <app-select-dict-choices
    [ngClass]="size === 'sm' ? 'sm' : ''"
    *ngIf="opened"
    [choices]="items"
    [indexBy]="indexBy"
    [search]="search"
    [showPreviousPageButton]="longList && page !== 0"
    [showNextPageButton]="longList && !(items?.length < listSize)"
    [active]="active"
    [activeIndex]="activeIndex"
    [template]="choicesTemplate"
    (onSelect)="onSelect($event)"
    (nextPage)="getNextPage()"
    (prevPage)="getPrevPage()"
  ></app-select-dict-choices>
</div>
`,
                styles: [`.select-dict div.form-control{
  cursor:pointer;
  padding-right:38px;
  overflow-x:hidden;
}

.select-dict .dropdown-toggle:after{
  position:absolute;
  top:50%;
  right:15px;
  -webkit-transform:translateY(-50%);
          transform:translateY(-50%);
}

.select-dict .hide-overflowed-text{
  overflow-x:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

.placeholder{
  height:1.3rem;
}
`],
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
    { type: SelectDictService, },
];
SelectDictComponent.propDecorators = {
    "selected": [{ type: Input },],
    "url": [{ type: Input },],
    "indexBy": [{ type: Input },],
    "filterBy": [{ type: Input },],
    "label": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "options": [{ type: Input },],
    "size": [{ type: Input },],
    "matchTemplate": [{ type: ContentChild, args: ['selectMatch',] },],
    "choicesTemplate": [{ type: ContentChild, args: ['selectChoices',] },],
    "choicesComponent": [{ type: ViewChild, args: [SelectDictChoicesComponent,] },],
    "clickHandler": [{ type: HostListener, args: ['document:click', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectDictModule {
}
SelectDictModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    ReactiveFormsModule,
                    FormsModule
                ],
                declarations: [
                    SelectDictComponent,
                    SelectSearchDirective,
                    SelectDictChoicesComponent,
                    SelectMatchDirective,
                    SelectDictPipe,
                    HighlightChoiceDirective
                ],
                providers: [
                    SelectDictService
                ],
                exports: [
                    SelectDictComponent
                ]
            },] },
];
/** @nocollapse */
SelectDictModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { SelectDictModule, SelectDictComponent, SelectDictService, HighlightChoiceDirective as ɵe, SelectDictChoicesComponent as ɵa, SelectDictPipe as ɵd, SelectMatchDirective as ɵc, SelectSearchDirective as ɵb };
//# sourceMappingURL=select-dict.js.map
