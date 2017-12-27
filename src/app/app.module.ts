import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectDictModule} from '../../release/select-dict.module';
import {SelectDictService} from '../../release/select-dict.service';
import {CustomDictService} from './custom-dict.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    SelectDictModule
  ],
  providers: [
    {provide: SelectDictService, useClass: CustomDictService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
