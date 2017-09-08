import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "./user.model";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {tokenNotExpired} from "angular2-jwt";

@Component({
        selector: 'app-signin',
        template: `
            
            <div *ngIf="errorMessage !== null" class="alert alert-danger" role="alert">
                {{errorMessage}}
            </div>
            <div class="col-8">
                <form [formGroup]="signinForm" (ngSubmit)="onSubmit()">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" class="form-control" formControlName="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" formControlName="password">
                    </div>
                    <button class="btn btn-primary" type="submit" [disabled]="!signinForm.valid">Submit</button>
                </form>
            </div>
        `
    })
export class SigninComponent implements OnInit {
    signinForm: FormGroup;

    errorMessage: string = null;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {

        if (this.authService.isLoggedIn() ) {
            this.router.navigateByUrl('/gradebook-list');
            return;
        }

        this.signinForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        const user = new User(this.signinForm.value.username, this.signinForm.value.password);
        this.authService.signin(user)
            .subscribe(
            data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('username', data.username);
                this.router.navigateByUrl('/gradebook-list');
                this.errorMessage = null;
            },
                error => {
                    console.log(error);
                    if (error.error.message === "Invalid login credentials") {
                        this.errorMessage = "Invalid login credentials.";
                    } else {
                        this.errorMessage = "Unexpected error occurred: " + error.error.message;
                    }
                }
            );

        this.signinForm.reset();
    }
}