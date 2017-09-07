import {Component} from "@angular/core";
import {AuthService} from "./auth/auth.service";

@Component({
    selector: 'app-header',
    template: `
        <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
            <a [routerLink]="['/']" class="navbar-brand d-flex w-50 mr-auto">SwooceBooks</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mx-auto w-100 justify-content-center">
                    <li *ngIf="authService.isLoggedIn()" routerLinkActive="active" class="nav-item">
                        <a [routerLink]="['/gradebook-list']"
                           class="nav-link"  href="#">My Gradebooks</a>
                    </li>
                    <li *ngIf="!authService.isLoggedIn()">
                        <a class="nav-link disabled"  href="#">My Gradebooks</a>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto w-100 justify-content-end">
                    <li class="nav-item" *ngIf="authService.isLoggedIn()">
                        <a class="nav-link" [routerLink]="['/auth/logout']">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    `
})
export class HeaderComponent {

    constructor(private authService: AuthService) {}

}