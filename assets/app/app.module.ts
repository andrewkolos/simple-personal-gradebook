import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {AssignmentComponent} from "./gradebook/category/assignment/assignment.component"
import {AutofocusDirective} from "./gradebook/editable/autofocus.directive";
import {EditableComponent} from "./gradebook/editable/editable.component";
import {CategoryComponent} from "./gradebook/category/category.component";
import {GradebookComponent} from "./gradebook/gradebook.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoryFooterComponent} from "./gradebook/category/category-footer.component";
import {HttpModule} from "@angular/http";
import {GradebookCardComponent} from "./gradebook-list/gradebook-card/gradebook-card.component";
import {GradebookListComponent} from "./gradebook-list/gradebook-list.component";
import {HeaderComponent} from "./header.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {routing} from "./app.routing";
import {SigninComponent} from "./auth/signin.component";
import {SignupComponent} from "./auth/signup.component";
import {LogoutComponent} from "./auth/logout.component";

@NgModule({
    declarations: [
        AppComponent,
        AssignmentComponent,
        AutofocusDirective,
        EditableComponent,
        CategoryComponent,
        CategoryFooterComponent,
        GradebookComponent,
        GradebookCardComponent,
        GradebookListComponent,
        HeaderComponent,
        AuthenticationComponent,
        SigninComponent,
        SignupComponent,
        LogoutComponent
    ],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, routing],
    bootstrap: [AppComponent]
})
export class AppModule {

}