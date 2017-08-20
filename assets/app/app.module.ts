import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {AssignmentComponent} from "./gradebook/category/assignment/assignment.component"
import {AutofocusDirective} from "./gradebook/editable/autofocus.directive";
import {EditableComponent} from "./gradebook/editable/editable.component";
import {CategoryComponent} from "./gradebook/category/category.component";
import {GradebookComponent} from "./gradebook/gradebook.component";

@NgModule({
    declarations: [
        AppComponent,
        AssignmentComponent,
        AutofocusDirective,
        EditableComponent,
        CategoryComponent,
        GradebookComponent
    ],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}