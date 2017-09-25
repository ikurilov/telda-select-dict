"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class HighlightChoiceDirective {
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
    { type: core_1.Directive, args: [{
                selector: '[appHighlightChoice]'
            },] },
];
/** @nocollapse */
HighlightChoiceDirective.ctorParameters = () => [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
];
HighlightChoiceDirective.propDecorators = {
    'appHighlightChoice': [{ type: core_1.Input },],
};
exports.HighlightChoiceDirective = HighlightChoiceDirective;
//# sourceMappingURL=highlight-choice.directive.js.map