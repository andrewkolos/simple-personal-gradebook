import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {AssignmentComponent} from "./gradebook/category/assignment/assignment.component"

@NgModule({
    declarations: [
        AppComponent,
        AssignmentComponent
    ],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}