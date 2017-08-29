import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

// Only alphanumerics, underscore, and dot.
// Underscore/dot cannot be at end or start.
// Underscore and dot cannot be adjacent to another underscore or dot.
// Number of characters is between 4 and 30, inclusive.
const usernamePattern = "[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){2,28}[a-zA-Z0-9]";

@Component({
    selector: 'app-signup',
    template: `
        <div class="col-md-8 col-md-offset-2">
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
                    <input type="password" id="confirm-password" class="form-control" formControlName="confirmPassword">
                </div>
                <button class="btn btn-primary" type="submit" [disabled]="!signupForm.valid">Submit</button>
            </form>
        </div>
    `
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;

    ngOnInit() {
        this.signupForm = new FormGroup({
            username: new FormControl(null, [Validators.required, Validators.pattern(usernamePattern)]),
            password: new FormControl(null, Validators.required),
            confirmPassword: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        console.log(this.signupForm);
        this.signupForm.reset();
    }
}