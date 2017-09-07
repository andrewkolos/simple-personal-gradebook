import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-logout',
    template: `
        <!--<br>
        <div class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" (click)="onLogout()">Logout</button>
        </div>-->
    `
})
export class LogoutComponent implements OnInit
{
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.onLogout();
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    }
}