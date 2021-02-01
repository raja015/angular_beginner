import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SquareComponent } from './square/square.component';
import { TodoComponent } from './todo/todo.component';
import { SplitWiseComponent } from './split-wise/split-wise.component';
// import {MatSliderModule} from '@angular/material/slider';
@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    TodoComponent,
    SplitWiseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
    // MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
