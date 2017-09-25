"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const array_1 = require("lodash/array");
const lang_1 = require("lodash/lang");
const object_1 = require("lodash/object");
const Subject_1 = require("rxjs/Subject");
const http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
const select_dict_choices_component_1 = require("./select-dict-choices/select-dict-choices.component");
const forms_1 = require("@angular/forms");
const select_dict_pipe_1 = require("./select-dict.pipe");
class SelectDictComponent {
    constructor(eRef, http) {
        this.eRef = eRef;
        this.http = http;
        this.indexBy = 'id';
        this.filterBy = 'name';
        this.dictFilter = new select_dict_pipe_1.SelectDictPipe();
        this.focusMatch = new Subject_1.Subject();
        this.focusSearch = new Subject_1.Subject();
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
        object_1.assign(params, this.options);
        return this.http.get(this.url, { withCredentials: true, params })
            .map(result => result.json())
            .subscribe((container) => {
            if (this.initialQuery) {
                this.initialQuery = false;
                this.longList = container.total < 0 || container.total > container.size;
            }
            this._items = container.list;
            this.items = lang_1.cloneDeep(this._items);
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
        return array_1.findIndex(this.items, item => item[this.indexBy] === this.active[this.indexBy]);
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
    { type: core_1.Component, args: [{
                selector: 'app-select-dict',
                templateUrl: './select-dict.component.html',
                styleUrls: ['./select-dict.component.css'],
                providers: [
                    {
                        provide: forms_1.NG_VALUE_ACCESSOR,
                        useExisting: core_1.forwardRef(() => SelectDictComponent),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
SelectDictComponent.ctorParameters = () => [
    { type: core_1.ElementRef, },
    { type: http_1.Http, },
];
SelectDictComponent.propDecorators = {
    'selected': [{ type: core_1.Input },],
    'url': [{ type: core_1.Input },],
    'indexBy': [{ type: core_1.Input },],
    'filterBy': [{ type: core_1.Input },],
    'label': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'options': [{ type: core_1.Input },],
    'matchTemplate': [{ type: core_1.ContentChild, args: ['selectMatch',] },],
    'choicesTemplate': [{ type: core_1.ContentChild, args: ['selectChoices',] },],
    'choicesComponent': [{ type: core_1.ViewChild, args: [select_dict_choices_component_1.SelectDictChoicesComponent,] },],
    'clickHandler': [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
};
exports.SelectDictComponent = SelectDictComponent;
//# sourceMappingURL=select-dict.component.js.map