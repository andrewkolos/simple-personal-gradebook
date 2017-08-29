import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
        selector: 'app-signin',
        template: `
            <div class="col-md-8 col-md-offset-2">
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


    ngOnInit() {
        this.signinForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        console.log(this.signinForm);
        this.signinForm.reset();
    }
}