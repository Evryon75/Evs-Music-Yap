import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { EditComponent } from './edit/edit.component';
import { DisplayComponent } from './display/display.component';
import {HttpClientModule} from "@angular/common/http";
import { PrevComponent } from './prev/prev.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    EditComponent,
    DisplayComponent,
    PrevComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
