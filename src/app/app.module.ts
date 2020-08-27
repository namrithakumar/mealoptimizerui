import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserDietTypeComponent } from './user_diet_type/user_diet_type.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDietTypeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
