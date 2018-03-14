(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('@angular/common/http'), require('lodash/array'), require('lodash/lang'), require('lodash/object'), require('rxjs/add/operator/map'), require('rxjs/add/operator/toPromise'), require('@angular/forms'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Subject', '@angular/common/http', 'lodash/array', 'lodash/lang', 'lodash/object', 'rxjs/add/operator/map', 'rxjs/add/operator/toPromise', '@angular/forms', '@angular/common'], factory) :
	(factory((global['select-dict'] = {}),global.ng.core,global.Rx,global.ng.common.http,global.array,global.lang,global.object,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.ng.forms,global.ng.common));
}(this, (function (exports,core,Subject,http,array,lang,object,map,toPromise,forms,common) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HighlightChoiceDirective = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    function HighlightChoiceDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    HighlightChoiceDirective.prototype.ngAfterViewInit = function () {
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    HighlightChoiceDirective.prototype.ngOnChanges = function (changes) {
        if (changes.appHighlightChoice && changes.appHighlightChoice.currentValue) {
            this.renderer.addClass(this.el.nativeElement, 'highlighted');
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, 'highlighted');
        }
    };
    return HighlightChoiceDirective;
}());
HighlightChoiceDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[appHighlightChoice]'
            },] },
];
/** @nocollapse */
HighlightChoiceDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
]; };
HighlightChoiceDirective.propDecorators = {
    "appHighlightChoice": [{ type: core.Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectDictPipe = (function () {
    function SelectDictPipe() {
    }
    /**
     * @param {?} value
     * @param {?} prop
     * @param {?} search
     * @return {?}
     */
    SelectDictPipe.prototype.transform = function (value, prop, search) {
        return value.filter(function (item) { return item[prop].toLowerCase().indexOf(search.toLowerCase()) !== -1; });
    };
    return SelectDictPipe;
}());
SelectDictPipe.decorators = [
    { type: core.Pipe, args: [{
                name: 'selectDict'
            },] },
];
/** @nocollapse */
SelectDictPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectMatchDirective = (function () {
    /**
     * @param {?} el
     */
    function SelectMatchDirective(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    SelectMatchDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.focus.subscribe(function () {
            setTimeout(function () { return _this.el.nativeElement.focus(); });
        });
    };
    return SelectMatchDirective;
}());
SelectMatchDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[appSelectMatch]'
            },] },
];
/** @nocollapse */
SelectMatchDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
SelectMatchDirective.propDecorators = {
    "focus": [{ type: core.Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectDictChoicesComponent = (function () {
    /**
     * @param {?} ref
     */
    function SelectDictChoicesComponent(ref) {
        this.ref = ref;
        this.onSelect = new core.EventEmitter();
        this.nextPage = new core.EventEmitter();
        this.prevPage = new core.EventEmitter();
    }
    /**
     * @return {?}
     */
    SelectDictChoicesComponent.prototype.ngOnInit = function () {
        this.dropDownMenuElem = this.ref.nativeElement.querySelector('.dropdown-menu');
    };
    /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    SelectDictChoicesComponent.prototype.selectItem = function ($event, item) {
        this.onSelect.emit({ $event: $event, item: item });
    };
    /**
     * @return {?}
     */
    SelectDictChoicesComponent.prototype._ensureHighlightVisible = function () {
        var /** @type {?} */ choices = this.dropDownMenuElem.querySelectorAll('.choice');
        if (!choices.length)
            return;
        var /** @type {?} */ highlightedChoice;
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
        var /** @type {?} */ posY = highlightedChoice.offsetTop + highlightedChoice.clientHeight - this.dropDownMenuElem.scrollTop;
        var /** @type {?} */ height = this.dropDownMenuElem.offsetHeight;
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
    };
    /**
     * @return {?}
     */
    SelectDictChoicesComponent.prototype.scrollToTop = function () {
        this.dropDownMenuElem.scrollTop = 0;
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    SelectDictChoicesComponent.prototype.trackByDictionary = function (index, item) {
        return item ? item[this.indexBy] : null;
    };
    /**
     * @return {?}
     */
    SelectDictChoicesComponent.prototype.getNextPage = function () {
        this.nextPage.emit();
    };
    /**
     * @return {?}
     */
    SelectDictChoicesComponent.prototype.getPrevPage = function () {
        this.prevPage.emit();
    };
    /**
     * @param {?} changesObj
     * @return {?}
     */
    SelectDictChoicesComponent.prototype.ngOnChanges = function (changesObj) {
        var _this = this;
        if (changesObj.activeIndex && changesObj.choices) {
            setTimeout(function () { return _this._ensureHighlightVisible(); });
        }
        else if (changesObj.activeIndex && !changesObj.choices) {
            this._ensureHighlightVisible();
        }
    };
    /**
     * @return {?}
     */
    SelectDictChoicesComponent.prototype.ngAfterViewChecked = function () {
    };
    /**
     * @return {?}
     */
    SelectDictChoicesComponent.prototype.ngDoCheck = function () {
    };
    return SelectDictChoicesComponent;
}());
SelectDictChoicesComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-select-dict-choices',
                template: "<div class=\"dropdown-menu show\"\n     style=\"position: absolute;\n       transform: translate3d(0, 38px, 0);\n       top: 0;\n       left: 0;\n       will-change: transform;\">\n  <a class=\"dropdown-item previous-page\"\n     [ngClass]=\"{'highlighted':this.activeIndex === 'prevPage'}\"\n     [hidden]=\"!showPreviousPageButton\"\n     (click)=\"getPrevPage()\"><<<</a>\n  <a class=\"dropdown-item choice hide-overflowed-text\"\n     [appHighlightChoice]=\"i === activeIndex\"\n     *ngFor=\"let item of choices; trackBy: trackByDictionary; let i = index\"\n     (click)=\"selectItem($event, item)\">\n    <ng-template\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{$implicit: item}\">\n    </ng-template>\n  </a>\n  <a class=\"dropdown-item next-page\"\n     [hidden]=\"!showNextPageButton\"\n     [ngClass]=\"{'highlighted':this.activeIndex === 'nextPage'}\"\n     (click)=\"getNextPage()\">>>></a>\n</div>\n",
                styles: [":host(.sm) .dropdown-menu{\n  font-size:0.875rem;\n  line-height:1.5;\n}\n\n:host(.sm) .dropdown-item{\n  padding:0.25rem 0.75rem;\n}\n\n:host(.active){\n  border-width:3px;\n}\n\n:host{\n  display:block;\n}\n\n.dropdown-menu{\n  width:100%;\n  max-height:200px;\n  margin-bottom:10px;\n  overflow-y:auto;\n  padding:0.2rem 0;\n}\n\n.dropdown-item{\n  padding:0.5rem 0.75rem;\n  cursor:pointer;\n  overflow-x:hidden;\n}\n\n.dropdown-item:active{\n  color:white !important;\n}\n\n.dropdown-item.highlighted, .dropdown-item.highlighted:hover{\n  background-color:#007bff;\n  color:#fff !important;\n}\n"]
            },] },
];
/** @nocollapse */
SelectDictChoicesComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
SelectDictChoicesComponent.propDecorators = {
    "template": [{ type: core.Input },],
    "choices": [{ type: core.Input },],
    "active": [{ type: core.Input },],
    "activeIndex": [{ type: core.Input },],
    "showNextPageButton": [{ type: core.Input },],
    "showPreviousPageButton": [{ type: core.Input },],
    "search": [{ type: core.Input },],
    "indexBy": [{ type: core.Input },],
    "onSelect": [{ type: core.Output },],
    "nextPage": [{ type: core.Output },],
    "prevPage": [{ type: core.Output },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectSearchDirective = (function () {
    /**
     * @param {?} el
     */
    function SelectSearchDirective(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    SelectSearchDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.focus)
            return;
        this.focusElement();
        this.focus.subscribe(function () { return _this.focusElement(); });
    };
    /**
     * @return {?}
     */
    SelectSearchDirective.prototype.focusElement = function () {
        var _this = this;
        setTimeout(function () { return _this.el.nativeElement.focus(); });
    };
    return SelectSearchDirective;
}());
SelectSearchDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[appSelectSearch]'
            },] },
];
/** @nocollapse */
SelectSearchDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
SelectSearchDirective.propDecorators = {
    "focus": [{ type: core.Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
var SelectDictService = (function () {
    /**
     * @param {?} http
     */
    function SelectDictService(http$$1) {
        this.http = http$$1;
    }
    /**
     * @param {?} dictionary_name
     * @param {?=} params
     * @return {?}
     */
    SelectDictService.prototype.getPage = function (dictionary_name, params) {
        var /** @type {?} */ options = {
            withCredentials: true,
            params: params
        };
        return (this.http.get(dictionary_name, options));
    };
    return SelectDictService;
}());
SelectDictService.decorators = [
    { type: core.Injectable },
];
/** @nocollapse */
SelectDictService.ctorParameters = function () { return [
    { type: http.HttpClient, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
var SelectDictComponent = (function () {
    /**
     * @param {?} eRef
     * @param {?} dictService
     */
    function SelectDictComponent(eRef, dictService) {
        this.eRef = eRef;
        this.dictService = dictService;
        this.indexBy = 'id';
        this.filterBy = 'name';
        this.dictFilter = new SelectDictPipe();
        this.focusMatch = new Subject.Subject();
        this.focusSearch = new Subject.Subject();
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
    /**
     * @param {?} event
     * @return {?}
     */
    SelectDictComponent.prototype.clickHandler = function (event) {
        var /** @type {?} */ selectDictContainer = this.eRef.nativeElement.querySelector('.select-dict');
        if (!selectDictContainer.contains(event.target) && this.opened) {
            this.onClose();
        }
    };
    /**
     * @return {?}
     */
    SelectDictComponent.prototype.ngOnInit = function () {
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    SelectDictComponent.prototype.onSelect = function ($event) {
        this.selected = $event.item;
        this.propagateChange(this.selected);
        this.onClose();
    };
    /**
     * @param {?=} $event
     * @return {?}
     */
    SelectDictComponent.prototype.onOpen = function ($event) {
        this.opened = true;
        this.active = this.selected;
        this.request();
    };
    /**
     * @return {?}
     */
    SelectDictComponent.prototype.onClose = function () {
        this.opened = false;
        this.resetComponent();
    };
    /**
     * @return {?}
     */
    SelectDictComponent.prototype.resetComponent = function () {
        this.items = [];
        this.active = null;
        this.activeIndex = -1;
        this.page = 0;
        this.search = '';
        this.focusMatch.next();
    };
    /**
     * @return {?}
     */
    SelectDictComponent.prototype.onClear = function () {
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SelectDictComponent.prototype.onSearch = function (value) {
        if (this.search !== value) {
            this.search = value;
            this.searchItem();
        }
    };
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    SelectDictComponent.prototype.activateNext = function () {
        this.setActiveItem('next');
    };
    /**
     * @return {?}
     */
    SelectDictComponent.prototype.activatePrev = function () {
        this.setActiveItem('prev');
    };
    /**
     * @return {?}
     */
    SelectDictComponent.prototype.request = function () {
        var _this = this;
        var /** @type {?} */ params = (_a = {}, _a[this.filterBy] = this.search ? this.search : '', _a.count = this.listSize, _a.from = this.page * this.listSize, _a);
        object.assign(params, this.options);
        return this.dictService.getPage(this.url, params)
            .subscribe(function (container) {
            if (_this.initialQuery) {
                _this.initialQuery = false;
                _this.longList = container.total < 0 || container.total > container.size;
            }
            _this._items = container.list;
            _this.items = lang.cloneDeep(_this._items);
            _this.lastRemoteSearch = (params[_this.filterBy]);
            _this.allInMemory = _this.page === 0 && container.size < _this.listSize;
            _this.activeIndex = _this.active ? _this.getActiveIndex() : -1;
            _this.choicesComponent.scrollToTop();
            _this.choicesComponent._ensureHighlightVisible();
        });
        var _a;
    };
    /**
     * @return {?}
     */
    SelectDictComponent.prototype.getNextPage = function () {
        this.page++;
        this.focusSearch.next();
        this.request();
    };
    /**
     * @return {?}
     */
    SelectDictComponent.prototype.getPrevPage = function () {
        this.page--;
        this.focusSearch.next();
        this.request();
    };
    /**
     * @param {?} direction
     * @return {?}
     */
    SelectDictComponent.prototype.setActiveItem = function (direction) {
        var /** @type {?} */ itemsLength = this.items.length;
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
    /**
     * @return {?}
     */
    SelectDictComponent.prototype.getActiveIndex = function () {
        var _this = this;
        return array.findIndex(this.items, function (item) { return item[_this.indexBy] === _this.active[_this.indexBy]; });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SelectDictComponent.prototype.writeValue = function (value) {
        this.selected = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectDictComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @return {?}
     */
    SelectDictComponent.prototype.registerOnTouched = function () {
    };
    /**
     * @return {?}
     */
    SelectDictComponent.prototype.needToLoadData = function () {
        if (this.longList) {
            return !this.allInMemory || this.search.indexOf(this.lastRemoteSearch) === -1;
        }
        return false;
    };
    
    return SelectDictComponent;
}());
SelectDictComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-select-dict',
                template: "<div *ngIf=\"label\" class=\"form-group\">\n  <label>{{label}}</label>\n  <div class=\"select-dict dropdown\">\n    <div class=\"form-control dropdown-toggle hide-overflowed-text\"\n         [ngClass]=\"size === 'sm' ? 'form-control-sm' : ''\"\n         tabindex=\"0\"\n         appSelectMatch\n         [focus]=\"focusMatch\"\n         [hidden]=\"opened\"\n         (keydown.enter)=\"onOpen()\"\n         (click)=\"onOpen($event)\">\n      <ng-template *ngIf=\"selected\"\n                   [ngTemplateOutlet]=\"matchTemplate\"\n                   [ngTemplateOutletContext]=\"{$implicit: selected}\">\n      </ng-template>\n      <span *ngIf=\"!selected\">{{placeholder || label}}</span>\n    </div>\n    <input\n      *ngIf=\"opened\"\n      #searchInput\n      class=\"form-control search-input\"\n      [ngClass]=\"size === 'sm' ? 'form-control-sm' : ''\"\n      appSelectSearch\n      [focus]=\"focusSearch\"\n      (keyup)=\"onSearch(searchInput.value)\"\n      (keydown.enter)=\"selectHighlighted()\"\n      (keydown.arrowup)=\"activatePrev()\"\n      (keydown.arrowdown)=\"activateNext()\">\n    <app-select-dict-choices\n      *ngIf=\"opened\"\n      [choices]=\"items\"\n      [indexBy]=\"indexBy\"\n      [search]=\"search\"\n      [showPreviousPageButton]=\"longList && page !== 0\"\n      [showNextPageButton]=\"longList && !(items?.length < listSize)\"\n      [active]=\"active\"\n      [activeIndex]=\"activeIndex\"\n      [template]=\"choicesTemplate\"\n      (onSelect)=\"onSelect($event)\"\n      (nextPage)=\"getNextPage()\"\n      (prevPage)=\"getPrevPage()\"\n    ></app-select-dict-choices>\n  </div>\n</div>\n<div *ngIf=\"label === undefined || label === null\" class=\"select-dict dropdown\">\n  <div class=\"form-control dropdown-toggle hide-overflowed-text\"\n       [ngClass]=\"size === 'sm' ? 'form-control-sm' : ''\"\n       tabindex=\"0\"\n       appSelectMatch\n       [focus]=\"focusMatch\"\n       [hidden]=\"opened\"\n       (keydown.enter)=\"onOpen()\"\n       (click)=\"onOpen($event)\">\n    <ng-template *ngIf=\"selected\"\n                 [ngTemplateOutlet]=\"matchTemplate\"\n                 [ngTemplateOutletContext]=\"{$implicit: selected}\">\n    </ng-template>\n    <div class=\"placeholder\" *ngIf=\"!selected\">{{placeholder || label}}</div>\n  </div>\n  <input\n    *ngIf=\"opened\"\n    #searchInput\n    class=\"form-control search-input\"\n    [ngClass]=\"size === 'sm' ? 'form-control-sm' : ''\"\n    appSelectSearch\n    [focus]=\"focusSearch\"\n    (keyup)=\"onSearch(searchInput.value)\"\n    (keydown.enter)=\"selectHighlighted()\"\n    (keydown.arrowup)=\"activatePrev()\"\n    (keydown.arrowdown)=\"activateNext()\">\n  <app-select-dict-choices\n    [ngClass]=\"size === 'sm' ? 'sm' : ''\"\n    *ngIf=\"opened\"\n    [choices]=\"items\"\n    [indexBy]=\"indexBy\"\n    [search]=\"search\"\n    [showPreviousPageButton]=\"longList && page !== 0\"\n    [showNextPageButton]=\"longList && !(items?.length < listSize)\"\n    [active]=\"active\"\n    [activeIndex]=\"activeIndex\"\n    [template]=\"choicesTemplate\"\n    (onSelect)=\"onSelect($event)\"\n    (nextPage)=\"getNextPage()\"\n    (prevPage)=\"getPrevPage()\"\n  ></app-select-dict-choices>\n</div>\n",
                styles: [".select-dict div.form-control{\n  cursor:pointer;\n  padding-right:38px;\n  overflow-x:hidden;\n}\n\n.select-dict .dropdown-toggle:after{\n  position:absolute;\n  top:50%;\n  right:15px;\n  -webkit-transform:translateY(-50%);\n          transform:translateY(-50%);\n}\n\n.select-dict .hide-overflowed-text{\n  overflow-x:hidden;\n  text-overflow:ellipsis;\n  white-space:nowrap;\n}\n\n.placeholder{\n  height:1.3rem;\n}\n"],
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return SelectDictComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
SelectDictComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: SelectDictService, },
]; };
SelectDictComponent.propDecorators = {
    "selected": [{ type: core.Input },],
    "url": [{ type: core.Input },],
    "indexBy": [{ type: core.Input },],
    "filterBy": [{ type: core.Input },],
    "label": [{ type: core.Input },],
    "placeholder": [{ type: core.Input },],
    "options": [{ type: core.Input },],
    "size": [{ type: core.Input },],
    "matchTemplate": [{ type: core.ContentChild, args: ['selectMatch',] },],
    "choicesTemplate": [{ type: core.ContentChild, args: ['selectChoices',] },],
    "choicesComponent": [{ type: core.ViewChild, args: [SelectDictChoicesComponent,] },],
    "clickHandler": [{ type: core.HostListener, args: ['document:click', ['$event'],] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectDictModule = (function () {
    function SelectDictModule() {
    }
    return SelectDictModule;
}());
SelectDictModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    http.HttpClientModule,
                    forms.ReactiveFormsModule,
                    forms.FormsModule
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
SelectDictModule.ctorParameters = function () { return []; };

exports.SelectDictModule = SelectDictModule;
exports.SelectDictComponent = SelectDictComponent;
exports.SelectDictService = SelectDictService;
exports.ɵe = HighlightChoiceDirective;
exports.ɵa = SelectDictChoicesComponent;
exports.ɵd = SelectDictPipe;
exports.ɵc = SelectMatchDirective;
exports.ɵb = SelectSearchDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=select-dict.umd.js.map
