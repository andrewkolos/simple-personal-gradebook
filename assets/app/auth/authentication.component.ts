import {Component} from "@angular/core";

@Component({
    selector: 'app-authentication',
    template: `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="signup-tab" data-toggle="tab" aria-controls="signup" aria-expended="true" [routerLink]="['signup']">Signup</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="signup-tab" data-toggle="tab" aria-controls="signin" aria-expended="true" [routerLink]="['signin']">Signin</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="signup-tab" data-toggle="tab" aria-controls="logout" aria-expended="true" [routerLink]="['logout']">Logout</a>
                    </li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AuthenticationComponent {

}