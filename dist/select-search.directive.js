"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class SelectSearchDirective {
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
    { type: core_1.Directive, args: [{
                selector: '[appSelectSearch]'
            },] },
];
/** @nocollapse */
SelectSearchDirective.ctorParameters = () => [
    { type: core_1.ElementRef, },
];
SelectSearchDirective.propDecorators = {
    'focus': [{ type: core_1.Input },],
};
exports.SelectSearchDirective = SelectSearchDirective;
//# sourceMappingURL=select-search.directive.js.map