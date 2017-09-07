import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {User} from "./user.model";
import {matchOtherValidator} from "../general/custom-validators";
import {Router} from "@angular/router";

// Only alphanumerics, underscore, and dot.
// Underscore/dot cannot be at end or start.
// Underscore and dot cannot be adjacent to another underscore or dot.
// Number of characters is between 4 and 30, inclusive.
const usernamePattern = "[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){2,28}[a-zA-Z0-9]";

@Component({
    selector: 'app-signup',
    template: `

        <div class="row">
            <div class="col-8 order-2 order-md-1">
                <div *ngIf="errorMessage !== null" class="alert alert-danger" role="alert">
                    {{errorMessage}}
                </div>
                <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" class="form-control" formControlName="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" formControlName="password">
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" class="form-control"
                               formControlName="confirmPassword">
                    </div>
                    <button class="btn btn-primary" type="submit" [disabled]="!signupForm.valid">Submit</button>
                </form>
            </div>
            <div class="col-12 col-md-3 order-1 order-md-2">
                <h5>Usernames must:</h5>
                <ul>
                    <li>contain in between 4 and 30 characters</li>
                    <li>not start with _ or .</li>
                    <li>not have two underscores or dots adjacent to one another</li>
                </ul>
            </div>
        </div>
    `
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;

    errorMessage: string = null;

    constructor(private authService: AuthService, private router: Router) {

    }

    ngOnInit() {
        this.signupForm = new FormGroup({
            username: new FormControl(null, [Validators.required, Validators.pattern(usernamePattern)]),
            password: new FormControl(null, Validators.required),
            confirmPassword: new FormControl(null, [Validators.required, matchOtherValidator('password')])
        });
    }

    onSubmit() {
        const user = new User(this.signupForm.value.username, this.signupForm.value.password);
        this.authService.signup(user)
            .subscribe(
                data => {
                    console.log(data)
                    this.errorMessage = null;
                    this.signupForm.reset();

                    this.authService.signin(user)
                        .subscribe(
                            data => {
                                localStorage.setItem('token', data.token);
                                localStorage.setItem('userId', data.userId);
                                this.router.navigateByUrl('/gradebook-list');
                                this.errorMessage = null;
                            },
                            error => {
                                console.log(error);
                                this.errorMessage = "Unexpected error occurred: " + error.error.message;
                            }
                        );
                },
                error => {
                    if (error.error.message.includes("to be unique")) {
                        this.errorMessage = "Username already taken.";
                    } else {
                        this.errorMessage = "Unexpected error occurred: " + error.error.message;
                    }
                    console.log(error);
                });
    }
}