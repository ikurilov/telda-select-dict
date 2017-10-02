"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SelectDictPipe = (function () {
    function SelectDictPipe() {
    }
    SelectDictPipe.prototype.transform = function (value, prop, search) {
        return value.filter(function (item) { return item[prop].toLowerCase().indexOf(search.toLowerCase()) !== -1; });
    };
    return SelectDictPipe;
}());
SelectDictPipe.decorators = [
    { type: core_1.Pipe, args: [{
                name: 'selectDict'
            },] },
];
/** @nocollapse */
SelectDictPipe.ctorParameters = function () { return []; };
exports.SelectDictPipe = SelectDictPipe;
