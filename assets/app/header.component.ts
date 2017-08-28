import {Component} from "@angular/core";

@Component({
    selector: 'app-header',
    template: `
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li routerLinkActive="active" class="nav-item">
                        <a [routerLink]="['/gradebookList']" class="nav-link" href="#">My Gradebooks</a>
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

}