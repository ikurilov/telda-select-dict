import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HighlightChoiceDirective } from './select-dict-choices/highlight-choice.directive';
import { SelectDictPipe } from './select-dict.pipe';
import { SelectMatchDirective } from './select-match.directive';
import { SelectDictChoicesComponent } from './select-dict-choices/select-dict-choices.component';
import { SelectSearchDirective } from './select-search.directive';
import { SelectDictComponent } from './select-dict.component';
export class SelectDictModule {
}
SelectDictModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpModule,
                    ReactiveFormsModule,
                    FormsModule
                ],
                declarations: [
                    SelectDictComponent,
                    SelectSearchDirective,
                    SelectDictChoicesComponent,
                    SelectMatchDirective,
                    SelectDictPipe,
                    HighlightChoiceDirective
                ],
                exports: [
                    SelectDictComponent
                ]
            },] },
];
/** @nocollapse */
SelectDictModule.ctorParameters = () => [];
//# sourceMappingURL=select-dict.module.js.map