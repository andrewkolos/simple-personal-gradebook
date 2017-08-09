import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {AssignmentComponent} from "./gradebook/category/assignment/assignment.component"
import {AutofocusDirective} from "./general/editable/autofocus.directive";
import {EditableComponent} from "./general/editable/editable.component";

@NgModule({
    declarations: [
        AppComponent,
        AssignmentComponent,
        AutofocusDirective,
        EditableComponent
    ],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}