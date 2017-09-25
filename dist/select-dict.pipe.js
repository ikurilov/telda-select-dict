"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class SelectDictPipe {
    transform(value, prop, search) {
        return value.filter((item) => item[prop].toLowerCase().indexOf(search.toLowerCase()) !== -1);
    }
}
SelectDictPipe.decorators = [
    { type: core_1.Pipe, args: [{
                name: 'selectDict'
            },] },
];
/** @nocollapse */
SelectDictPipe.ctorParameters = () => [];
exports.SelectDictPipe = SelectDictPipe;
//# sourceMappingURL=select-dict.pipe.js.map