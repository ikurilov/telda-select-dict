"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SelectSearchDirective = (function () {
    function SelectSearchDirective(el) {
        this.el = el;
    }
    SelectSearchDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.focus)
            return;
        this.focusElement();
        this.focus.subscribe(function () { return _this.focusElement(); });
    };
    SelectSearchDirective.prototype.focusElement = function () {
        var _this = this;
        setTimeout(function () { return _this.el.nativeElement.focus(); });
    };
    return SelectSearchDirective;
}());
SelectSearchDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[appSelectSearch]'
            },] },
];
/** @nocollapse */
SelectSearchDirective.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
SelectSearchDirective.propDecorators = {
    'focus': [{ type: core_1.Input },],
};
exports.SelectSearchDirective = SelectSearchDirective;
