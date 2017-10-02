"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var highlight_choice_directive_1 = require("./select-dict-choices/highlight-choice.directive");
var select_dict_pipe_1 = require("./select-dict.pipe");
var select_match_directive_1 = require("./select-match.directive");
var select_dict_choices_component_1 = require("./select-dict-choices/select-dict-choices.component");
var select_search_directive_1 = require("./select-search.directive");
var select_dict_component_1 = require("./select-dict.component");
var select_dict_component_2 = require("./select-dict.component");
exports.SelectDictComponent = select_dict_component_2.SelectDictComponent;
var SelectDictModule = (function () {
    function SelectDictModule() {
    }
    return SelectDictModule;
}());
SelectDictModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    http_1.HttpModule,
                    forms_1.ReactiveFormsModule,
                    forms_1.FormsModule
                ],
                declarations: [
                    select_dict_component_1.SelectDictComponent,
                    select_search_directive_1.SelectSearchDirective,
                    select_dict_choices_component_1.SelectDictChoicesComponent,
                    select_match_directive_1.SelectMatchDirective,
                    select_dict_pipe_1.SelectDictPipe,
                    highlight_choice_directive_1.HighlightChoiceDirective
                ],
                exports: [
                    select_dict_component_1.SelectDictComponent
                ]
            },] },
];
/** @nocollapse */
SelectDictModule.ctorParameters = function () { return []; };
exports.SelectDictModule = SelectDictModule;
