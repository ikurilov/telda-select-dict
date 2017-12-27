"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HighlightChoiceDirective = (function () {
    function HighlightChoiceDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    HighlightChoiceDirective.prototype.ngAfterViewInit = function () {
    };
    HighlightChoiceDirective.prototype.ngOnChanges = function (changes) {
        if (changes.appHighlightChoice && changes.appHighlightChoice.currentValue) {
            this.renderer.addClass(this.el.nativeElement, 'highlighted');
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, 'highlighted');
        }
    };
    HighlightChoiceDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[appHighlightChoice]'
                },] },
    ];
    /** @nocollapse */
    HighlightChoiceDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer2, },
    ]; };
    HighlightChoiceDirective.propDecorators = {
        "appHighlightChoice": [{ type: core_1.Input },],
    };
    return HighlightChoiceDirective;
}());
exports.HighlightChoiceDirective = HighlightChoiceDirective;
