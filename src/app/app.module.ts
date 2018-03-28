import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomDictService} from './custom-dict.service';
import {SelectDictModule, SelectDictService} from 'lib';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDictModule
  ],
  providers: [
    {provide: SelectDictService, useClass: CustomDictService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
