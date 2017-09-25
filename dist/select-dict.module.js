"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const highlight_choice_directive_1 = require("./select-dict-choices/highlight-choice.directive");
const select_dict_pipe_1 = require("./select-dict.pipe");
const select_match_directive_1 = require("./select-match.directive");
const select_dict_choices_component_1 = require("./select-dict-choices/select-dict-choices.component");
const select_search_directive_1 = require("./select-search.directive");
const select_dict_component_1 = require("./select-dict.component");
class SelectDictModule {
}
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
SelectDictModule.ctorParameters = () => [];
exports.SelectDictModule = SelectDictModule;
//# sourceMappingURL=select-dict.module.js.map