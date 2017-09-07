import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {AutofocusDirective} from "./gradebook/editable/autofocus.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HeaderComponent} from "./header.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {routing} from "./app.routing";
import {SigninComponent} from "./auth/signin.component";
import {SignupComponent} from "./auth/signup.component";
import {LogoutComponent} from "./auth/logout.component";
import {AuthService} from "./auth/auth.service";
import {GradebookModule} from "./gradebook/gradebook.module";

@NgModule({
    declarations: [
        AppComponent,
        AutofocusDirective,
        HeaderComponent,
        AuthenticationComponent,
        SigninComponent,
        SignupComponent,
        LogoutComponent
    ],
    providers: [AuthService],
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, GradebookModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}