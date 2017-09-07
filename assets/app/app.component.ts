import {Component, OnInit} from '@angular/core';
import {GradebookService} from "./gradebook/gradebook.service";
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {tokenNotExpired} from "angular2-jwt";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {

        if (!this.authService.isLoggedIn()) {
            console.log("im being called");
            this.router.navigateByUrl('/auth/signin');
            return;
        }
    }
}