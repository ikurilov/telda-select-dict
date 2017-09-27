import { Directive, ElementRef, Input } from '@angular/core';
export class SelectSearchDirective {
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        if (!this.focus)
            return;
        this.focusElement();
        this.focus.subscribe(() => this.focusElement());
    }
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
    'focus': [{ type: Input },],
};
//# sourceMappingURL=select-search.directive.js.map