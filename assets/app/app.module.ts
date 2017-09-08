import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from "./app.component";
import {HttpModule} from "@angular/http";
import {HeaderComponent} from "./header.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {routing} from "./app.routing";
import {AuthService} from "./auth/auth.service";
import {GradebookModule} from "./gradebook/gradebook.module";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AuthenticationComponent
    ],
    providers: [AuthService],
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        GradebookModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}