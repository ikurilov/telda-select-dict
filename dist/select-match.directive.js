"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class SelectMatchDirective {
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
    { type: core_1.Directive, args: [{
                selector: '[appSelectMatch]'
            },] },
];
/** @nocollapse */
SelectMatchDirective.ctorParameters = () => [
    { type: core_1.ElementRef, },
];
SelectMatchDirective.propDecorators = {
    'focus': [{ type: core_1.Input },],
};
exports.SelectMatchDirective = SelectMatchDirective;
//# sourceMappingURL=select-match.directive.js.map