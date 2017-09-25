import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
export class SelectDictChoicesComponent {
    constructor(ref) {
        this.ref = ref;
        this.onSelect = new EventEmitter();
        this.nextPage = new EventEmitter();
        this.prevPage = new EventEmitter();
    }
    ngOnInit() {
        this.dropDownMenuElem = this.ref.nativeElement.querySelector('.dropdown-menu');
    }
    selectItem($event, item) {
        this.onSelect.emit({ $event, item });
    }
    _ensureHighlightVisible() {
        const choices = this.dropDownMenuElem.querySelectorAll('.choice');
        if (!choices.length)
            return;
        let highlightedChoice;
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
        const posY = highlightedChoice.offsetTop + highlightedChoice.clientHeight - this.dropDownMenuElem.scrollTop;
        const height = this.dropDownMenuElem.offsetHeight;
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
    scrollToTop() {
        this.dropDownMenuElem.scrollTop = 0;
    }
    trackByDictionary(index, item) {
        return item ? item[this.indexBy] : null;
    }
    getNextPage() {
        this.nextPage.emit();
    }
    getPrevPage() {
        this.prevPage.emit();
    }
    ngOnChanges(changesObj) {
        if (changesObj.activeIndex && changesObj.choices) {
            setTimeout(() => this._ensureHighlightVisible());
        }
        else if (changesObj.activeIndex && !changesObj.choices) {
            this._ensureHighlightVisible();
        }
    }
    ngAfterViewChecked() {
    }
    ngDoCheck() {
    }
}
SelectDictChoicesComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-select-dict-choices',
                templateUrl: './select-dict-choices.component.html',
                styleUrls: ['./select-dict-choices.component.css']
            },] },
];
/** @nocollapse */
SelectDictChoicesComponent.ctorParameters = () => [
    { type: ElementRef, },
];
SelectDictChoicesComponent.propDecorators = {
    'template': [{ type: Input },],
    'choices': [{ type: Input },],
    'active': [{ type: Input },],
    'activeIndex': [{ type: Input },],
    'showNextPageButton': [{ type: Input },],
    'showPreviousPageButton': [{ type: Input },],
    'search': [{ type: Input },],
    'indexBy': [{ type: Input },],
    'onSelect': [{ type: Output },],
    'nextPage': [{ type: Output },],
    'prevPage': [{ type: Output },],
};
//# sourceMappingURL=select-dict-choices.component.js.map