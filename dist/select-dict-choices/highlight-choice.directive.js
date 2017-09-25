import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
export class HighlightChoiceDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
    }
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
    'appHighlightChoice': [{ type: Input },],
};
//# sourceMappingURL=highlight-choice.directive.js.map