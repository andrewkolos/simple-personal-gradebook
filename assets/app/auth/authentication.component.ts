import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {AuthService} from "./auth.service";

@Component({
    selector: 'app-authentication',
    template: `
        <div class="row">
            <div class="spacing mx-auto col-8">
                <header>
                    <nav>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" *ngIf="!isLoggedIn">
                                <a class="nav-link" id="signup-tab" data-toggle="tab" aria-controls="signup"
                                   aria-expended="true"
                                   [routerLink]="['signup']" routerLinkActive="active">Signup</a>
                            </li>
                            <li class="nav-item" *ngIf="!isLoggedIn">
                                <a class="nav-link" id="signin-tab" data-toggle="tab" aria-controls="signin"
                                   aria-expended="true"
                                   [routerLink]="['signin']" routerLinkActive="active">Signin</a>
                            </li>
                            <li class="nav-item" *ngIf="isLoggedIn">
                                <a class="nav-link" id="logout-tab" data-toggle="tab" aria-controls="logout"
                                   aria-expended="true"
                                   [routerLink]="['logout']" routerLinkActive="active">Logout</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                    <router-outlet></router-outlet>
                

            </div>
        </div>
    `
})
export class AuthenticationComponent implements OnInit, AfterViewInit {

    isLoggedIn = false;

    constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn();
    }

    ngAfterViewInit() {
        this.isLoggedIn = this.authService.isLoggedIn();
        this.cdr.detectChanges();
    }


}