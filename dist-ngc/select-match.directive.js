import { Directive, ElementRef, Input } from '@angular/core';
export class SelectMatchDirective {
    constructor(el) {
        this.el = el;
    }
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
    'focus': [{ type: Input },],
};
//# sourceMappingURL=select-match.directive.js.map