import {Component} from "@angular/core";
import {AuthService} from "./auth/auth.service";

@Component({
    selector: 'app-header',
    template: `
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <span class="navbar-brand" href="#">Branding</span>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li routerLinkActive="active" class="nav-item">
                        <a [routerLink]="['/gradebook-list']" class="nav-link" href="#">My Gradebooks</a>
                    </li>
                    <li routerLinkActive="active" class="nav-item">
                        <a [routerLink]="['/auth']" class="nav-link" href="#">Authentication</a>
                    </li>
                </ul>
            </div>
        </nav>
    `
})
export class HeaderComponent {

    constructor(private authService: AuthService) {}

}