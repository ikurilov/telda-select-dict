"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var SelectMatchDirective = (function () {
    function SelectMatchDirective(el) {
        this.el = el;
    }
    SelectMatchDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.focus.subscribe(function () {
            setTimeout(function () { return _this.el.nativeElement.focus(); });
        });
    };
    SelectMatchDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[appSelectMatch]'
                },] },
    ];
    /** @nocollapse */
    SelectMatchDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    SelectMatchDirective.propDecorators = {
        "focus": [{ type: core_1.Input },],
    };
    return SelectMatchDirective;
}());
exports.SelectMatchDirective = SelectMatchDirective;
