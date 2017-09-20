import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SelectDictComponent } from './select-dict/select-dict.component';
import { SelectSearchDirective } from './select-dict/select-search.directive';
import { SelectDictChoicesComponent } from './select-dict/select-dict-choices/select-dict-choices.component';
import { SelectMatchDirective } from './select-dict/select-match.directive';
import { SelectDictPipe } from './select-dict/select-dict.pipe';
import {HttpModule} from '@angular/http';
import { HighlightChoiceDirective } from './select-dict/select-dict-choices/highlight-choice.directive';

@NgModule({
  declarations: [
    AppComponent,
    SelectDictComponent,
    SelectSearchDirective,
    SelectDictChoicesComponent,
    SelectMatchDirective,
    SelectDictPipe,
    HighlightChoiceDirective,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
