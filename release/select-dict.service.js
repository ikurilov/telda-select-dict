"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var SelectDictService = (function () {
    function SelectDictService(http) {
        this.http = http;
    }
    SelectDictService.prototype.getPage = function (dictionary_name, params) {
        var options = {
            withCredentials: true,
            params: params
        };
        return this.http.get(dictionary_name, options).map(function (result) { return result.json(); });
    };
    return SelectDictService;
}());
SelectDictService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
SelectDictService.ctorParameters = function () { return [
    { type: http_1.Http, },
]; };
exports.SelectDictService = SelectDictService;
