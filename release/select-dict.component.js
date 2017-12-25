"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var array_1 = require("lodash/array");
var lang_1 = require("lodash/lang");
var object_1 = require("lodash/object");
var Subject_1 = require("rxjs/Subject");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var select_dict_choices_component_1 = require("./select-dict-choices/select-dict-choices.component");
var forms_1 = require("@angular/forms");
var select_dict_pipe_1 = require("./select-dict.pipe");
var select_dict_service_1 = require("./select-dict.service");
var SelectDictComponent = (function () {
    function SelectDictComponent(eRef, http, dictService) {
        this.eRef = eRef;
        this.http = http;
        this.dictService = dictService;
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
        this.propagateChange = function (_) {
        };
    }
    SelectDictComponent.prototype.clickHandler = function (event) {
        var selectDictContainer = this.eRef.nativeElement.querySelector('.select-dict');
        if (!selectDictContainer.contains(event.target) && this.opened) {
            this.onClose();
        }
    };
    SelectDictComponent.prototype.ngOnInit = function () {
    };
    SelectDictComponent.prototype.onSelect = function ($event) {
        this.selected = $event.item;
        this.propagateChange(this.selected);
        this.onClose();
    };
    SelectDictComponent.prototype.onOpen = function ($event) {
        this.opened = true;
        this.active = this.selected;
        this.request();
    };
    SelectDictComponent.prototype.onClose = function () {
        this.opened = false;
        this.resetComponent();
    };
    SelectDictComponent.prototype.resetComponent = function () {
        this.items = [];
        this.active = null;
        this.activeIndex = -1;
        this.page = 0;
        this.search = '';
        this.focusMatch.next();
    };
    SelectDictComponent.prototype.onClear = function () {
    };
    SelectDictComponent.prototype.onSearch = function (value) {
        if (this.search !== value) {
            this.search = value;
            this.searchItem();
        }
    };
    SelectDictComponent.prototype.searchItem = function () {
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
    };
    SelectDictComponent.prototype.selectHighlighted = function () {
        if (this.activeIndex === 'prevPage') {
            this.getPrevPage();
        }
        else if (this.activeIndex === 'nextPage') {
            this.getNextPage();
        }
        else {
            this.onSelect({ $event: null, item: this.active });
        }
    };
    SelectDictComponent.prototype.activateNext = function () {
        this.setActiveItem('next');
    };
    SelectDictComponent.prototype.activatePrev = function () {
        this.setActiveItem('prev');
    };
    SelectDictComponent.prototype.request = function () {
        var _this = this;
        var params = (_a = {},
            _a[this.filterBy] = this.search,
            _a.count = this.listSize,
            _a.from = this.page * this.listSize,
            _a);
        object_1.assign(params, this.options);
        return this.dictService.getPage(this.url, params)
            .subscribe(function (container) {
            if (_this.initialQuery) {
                _this.initialQuery = false;
                _this.longList = container.total < 0 || container.total > container.size;
            }
            _this._items = container.list;
            _this.items = lang_1.cloneDeep(_this._items);
            _this.lastRemoteSearch = params[_this.filterBy];
            _this.allInMemory = _this.page === 0 && container.size < _this.listSize;
            _this.activeIndex = _this.active ? _this.getActiveIndex() : -1;
            _this.choicesComponent.scrollToTop();
            _this.choicesComponent._ensureHighlightVisible();
        });
        var _a;
    };
    SelectDictComponent.prototype.getNextPage = function () {
        this.page++;
        this.focusSearch.next();
        this.request();
    };
    SelectDictComponent.prototype.getPrevPage = function () {
        this.page--;
        this.focusSearch.next();
        this.request();
    };
    SelectDictComponent.prototype.setActiveItem = function (direction) {
        var itemsLength = this.items.length;
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
    };
    SelectDictComponent.prototype.getActiveIndex = function () {
        var _this = this;
        return array_1.findIndex(this.items, function (item) { return item[_this.indexBy] === _this.active[_this.indexBy]; });
    };
    SelectDictComponent.prototype.writeValue = function (value) {
        this.selected = value;
    };
    SelectDictComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    SelectDictComponent.prototype.registerOnTouched = function () {
    };
    SelectDictComponent.prototype.needToLoadData = function () {
        if (this.longList) {
            return !this.allInMemory || this.search.indexOf(this.lastRemoteSearch) === -1;
        }
        return false;
    };
    ;
    return SelectDictComponent;
}());
SelectDictComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-select-dict',
                template: "<div *ngIf=\"label\" class=\"form-group\"> <label>{{label}}</label> <div class=\"select-dict dropdown\"> <div class=\"form-control dropdown-toggle hide-overflowed-text\" [ngClass]=\"size === 'sm' ? 'form-control-sm' : ''\" tabindex=\"0\" appSelectMatch [focus]=\"focusMatch\" [hidden]=\"opened\" (keydown.enter)=\"onOpen()\" (click)=\"onOpen($event)\"> <ng-template *ngIf=\"selected\" [ngTemplateOutlet]=\"matchTemplate\" [ngOutletContext]=\"{$implicit: selected}\"> </ng-template> <span *ngIf=\"!selected\">{{placeholder || label}}</span> </div> <input *ngIf=\"opened\" #searchInput class=\"form-control search-input\" [ngClass]=\"size === 'sm' ? 'form-control-sm' : ''\" appSelectSearch [focus]=\"focusSearch\" (keyup)=\"onSearch(searchInput.value)\" (keydown.enter)=\"selectHighlighted()\" (keydown.arrowup)=\"activatePrev()\" (keydown.arrowdown)=\"activateNext()\"> <app-select-dict-choices *ngIf=\"opened\" [choices]=\"items\" [indexBy]=\"indexBy\" [search]=\"search\" [showPreviousPageButton]=\"longList && page !== 0\" [showNextPageButton]=\"longList && !(items?.length < listSize)\" [active]=\"active\" [activeIndex]=\"activeIndex\" [template]=\"choicesTemplate\" (onSelect)=\"onSelect($event)\" (nextPage)=\"getNextPage()\" (prevPage)=\"getPrevPage()\" ></app-select-dict-choices> </div> </div> <div *ngIf=\"label === undefined || label === null\" class=\"select-dict dropdown\"> <div class=\"form-control dropdown-toggle hide-overflowed-text\" [ngClass]=\"size === 'sm' ? 'form-control-sm' : ''\" tabindex=\"0\" appSelectMatch [focus]=\"focusMatch\" [hidden]=\"opened\" (keydown.enter)=\"onOpen()\" (click)=\"onOpen($event)\"> <ng-template *ngIf=\"selected\" [ngTemplateOutlet]=\"matchTemplate\" [ngOutletContext]=\"{$implicit: selected}\"> </ng-template> <div class=\"placeholder\" *ngIf=\"!selected\">{{placeholder || label}}</div> </div> <input *ngIf=\"opened\" #searchInput class=\"form-control search-input\" [ngClass]=\"size === 'sm' ? 'form-control-sm' : ''\" appSelectSearch [focus]=\"focusSearch\" (keyup)=\"onSearch(searchInput.value)\" (keydown.enter)=\"selectHighlighted()\" (keydown.arrowup)=\"activatePrev()\" (keydown.arrowdown)=\"activateNext()\"> <app-select-dict-choices [ngClass]=\"size === 'sm' ? 'sm' : ''\" *ngIf=\"opened\" [choices]=\"items\" [indexBy]=\"indexBy\" [search]=\"search\" [showPreviousPageButton]=\"longList && page !== 0\" [showNextPageButton]=\"longList && !(items?.length < listSize)\" [active]=\"active\" [activeIndex]=\"activeIndex\" [template]=\"choicesTemplate\" (onSelect)=\"onSelect($event)\" (nextPage)=\"getNextPage()\" (prevPage)=\"getPrevPage()\" ></app-select-dict-choices> </div> ",
                styles: [".select-dict div.form-control { cursor: pointer; padding-right: 38px; overflow-x: hidden; } .select-dict .dropdown-toggle:after { position: absolute; top: 50%; right: 15px; transform: translateY(-50%); } .select-dict .hide-overflowed-text { overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap; } .placeholder { height: 1.3rem; } "],
                providers: [
                    {
                        provide: forms_1.NG_VALUE_ACCESSOR,
                        useExisting: core_1.forwardRef(function () { return SelectDictComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
SelectDictComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: http_1.Http, },
    { type: select_dict_service_1.SelectDictService, },
]; };
SelectDictComponent.propDecorators = {
    'selected': [{ type: core_1.Input },],
    'url': [{ type: core_1.Input },],
    'indexBy': [{ type: core_1.Input },],
    'filterBy': [{ type: core_1.Input },],
    'label': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'options': [{ type: core_1.Input },],
    'size': [{ type: core_1.Input },],
    'matchTemplate': [{ type: core_1.ContentChild, args: ['selectMatch',] },],
    'choicesTemplate': [{ type: core_1.ContentChild, args: ['selectChoices',] },],
    'choicesComponent': [{ type: core_1.ViewChild, args: [select_dict_choices_component_1.SelectDictChoicesComponent,] },],
    'clickHandler': [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
};
exports.SelectDictComponent = SelectDictComponent;
