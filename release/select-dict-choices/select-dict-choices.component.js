"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SelectDictChoicesComponent = (function () {
    function SelectDictChoicesComponent(ref) {
        this.ref = ref;
        this.onSelect = new core_1.EventEmitter();
        this.nextPage = new core_1.EventEmitter();
        this.prevPage = new core_1.EventEmitter();
    }
    SelectDictChoicesComponent.prototype.ngOnInit = function () {
        this.dropDownMenuElem = this.ref.nativeElement.querySelector('.dropdown-menu');
    };
    SelectDictChoicesComponent.prototype.selectItem = function ($event, item) {
        this.onSelect.emit({ $event: $event, item: item });
    };
    SelectDictChoicesComponent.prototype._ensureHighlightVisible = function () {
        var choices = this.dropDownMenuElem.querySelectorAll('.choice');
        if (!choices.length)
            return;
        var highlightedChoice;
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
        var posY = highlightedChoice.offsetTop + highlightedChoice.clientHeight - this.dropDownMenuElem.scrollTop;
        var height = this.dropDownMenuElem.offsetHeight;
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
    SelectDictChoicesComponent.prototype.scrollToTop = function () {
        this.dropDownMenuElem.scrollTop = 0;
    };
    SelectDictChoicesComponent.prototype.trackByDictionary = function (index, item) {
        return item ? item[this.indexBy] : null;
    };
    SelectDictChoicesComponent.prototype.getNextPage = function () {
        this.nextPage.emit();
    };
    SelectDictChoicesComponent.prototype.getPrevPage = function () {
        this.prevPage.emit();
    };
    SelectDictChoicesComponent.prototype.ngOnChanges = function (changesObj) {
        var _this = this;
        if (changesObj.activeIndex && changesObj.choices) {
            setTimeout(function () { return _this._ensureHighlightVisible(); });
        }
        else if (changesObj.activeIndex && !changesObj.choices) {
            this._ensureHighlightVisible();
        }
    };
    SelectDictChoicesComponent.prototype.ngAfterViewChecked = function () {
    };
    SelectDictChoicesComponent.prototype.ngDoCheck = function () {
    };
    return SelectDictChoicesComponent;
}());
SelectDictChoicesComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-select-dict-choices',
                template: "<div class=\"dropdown-menu show\" style=\"position: absolute; transform: translate3d(0, 38px, 0); top: 0; left: 0; will-change: transform;\"> <a class=\"dropdown-item previous-page\" [ngClass]=\"{'highlighted':this.activeIndex === 'prevPage'}\" [hidden]=\"!showPreviousPageButton\" (click)=\"getPrevPage()\"><<<</a> <a class=\"dropdown-item choice hide-overflowed-text\" [appHighlightChoice]=\"i === activeIndex\" *ngFor=\"let item of choices; trackBy: trackByDictionary; let i = index\" (click)=\"selectItem($event, item)\"> <ng-template [ngTemplateOutlet]=\"template\" [ngOutletContext]=\"{$implicit: item}\"> </ng-template> </a> <a class=\"dropdown-item next-page\" [hidden]=\"!showNextPageButton\" [ngClass]=\"{'highlighted':this.activeIndex === 'nextPage'}\" (click)=\"getNextPage()\">>>></a> </div> ",
                styles: [":host(.sm) .dropdown-menu { font-size: 0.875rem; line-height: 1.5; } :host(.sm) .dropdown-item { padding: 0.25rem 0.75rem; } :host(.active) { border-width: 3px; } :host { display: block; } .dropdown-menu { width: 100%; max-height: 200px; margin-bottom: 10px; overflow-y: auto; padding: 0.2rem 0; } .dropdown-item { padding: 0.5rem 0.75rem; cursor: pointer; overflow-x: hidden; } .dropdown-item:active { color: white !important; } .dropdown-item.highlighted, .dropdown-item.highlighted:hover { background-color: #007bff; color: #fff !important; } "]
            },] },
];
/** @nocollapse */
SelectDictChoicesComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
SelectDictChoicesComponent.propDecorators = {
    'template': [{ type: core_1.Input },],
    'choices': [{ type: core_1.Input },],
    'active': [{ type: core_1.Input },],
    'activeIndex': [{ type: core_1.Input },],
    'showNextPageButton': [{ type: core_1.Input },],
    'showPreviousPageButton': [{ type: core_1.Input },],
    'search': [{ type: core_1.Input },],
    'indexBy': [{ type: core_1.Input },],
    'onSelect': [{ type: core_1.Output },],
    'nextPage': [{ type: core_1.Output },],
    'prevPage': [{ type: core_1.Output },],
};
exports.SelectDictChoicesComponent = SelectDictChoicesComponent;
