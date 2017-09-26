import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SelectDictModule} from '../../dist-ngc/select-dict.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    SelectDictModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
