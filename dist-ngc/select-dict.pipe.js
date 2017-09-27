import { Pipe } from '@angular/core';
export class SelectDictPipe {
    transform(value, prop, search) {
        return value.filter((item) => item[prop].toLowerCase().indexOf(search.toLowerCase()) !== -1);
    }
}
SelectDictPipe.decorators = [
    { type: Pipe, args: [{
                name: 'selectDict'
            },] },
];
/** @nocollapse */
SelectDictPipe.ctorParameters = () => [];
//# sourceMappingURL=select-dict.pipe.js.map