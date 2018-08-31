import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HighlightChoiceDirective} from './select-dict-choices/highlight-choice.directive';
import {SelectDictPipe} from './select-dict.pipe';
import {SelectMatchDirective} from './select-match.directive';
import {SelectDictChoicesComponent} from './select-dict-choices/select-dict-choices.component';
import {SelectSearchDirective} from './select-search.directive';
import {SelectDictComponent} from './select-dict.component';
import {SelectDictService} from './select-dict.service';
import {HttpClientModule} from '@angular/common/http';
import {VirtualScrollModule} from 'angular2-virtual-scroll';

export {SelectDictComponent} from './select-dict.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    VirtualScrollModule
  ],
  declarations: [
    SelectDictComponent,
    SelectSearchDirective,
    SelectDictChoicesComponent,
    SelectMatchDirective,
    SelectDictPipe,
    HighlightChoiceDirective
  ],
  providers: [
    SelectDictService
  ],
  exports: [
    SelectDictComponent
  ]
})
export class SelectDictModule {
}
