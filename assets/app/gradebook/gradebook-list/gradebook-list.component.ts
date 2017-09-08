import {Component, OnInit} from "@angular/core";
import {Gradebook} from "../gradebook.model";
import {GradebookService} from "../gradebook.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GRADEBOOK_NAME_PATTERN} from "../../general/patterns";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {tokenNotExpired} from "angular2-jwt";

@Component({
    selector: 'app-gradebook-list',
    template: `
        <ng-container *ngIf="isLoggedIn()">
            <div class="card-columns">
                <app-gradebook-card class="card" *ngFor="let gradebook of gradebooks"
                                    [gradebook]="gradebook"></app-gradebook-card>
            </div>
            <hr class="mt-4">
            <h3>Add new gradebook</h3>
            <form [formGroup]="addGradebookForm" (ngSubmit)="onAddGradebook()">
                <div class="form-group">
                    <label for="gradebook-name">Name</label>
                    <input type="text" id="gradebook-name" class="form-control" formControlName="name">
                </div>
                <button class="btn btn-primary" type="submit" [disabled]="!addGradebookForm.valid">Submit</button>
            </form>
            <div class="alert alert-info mt-4 col-12">
                <h5>Names must:</h5>
                <ul>
                    <li>be composed of alphanumeric characters, space, parentheses, and square brackets</li>
                    <li>be made up of in between 1 and 30 characters</li>
                    <li>not start or end with a space</li>
                </ul>
            </div>
        </ng-container>
    `, styleUrls: ['gradebook-list.css']
})
export class GradebookListComponent implements OnInit {
    addGradebookForm: FormGroup;

    gradebooks: Gradebook[];

    constructor(private _gradebookService: GradebookService, private authService: AuthService, private router: Router) {
        this.addGradebookForm = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.pattern(GRADEBOOK_NAME_PATTERN)])
        });
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/auth/signin');
            return;
        }

        this._gradebookService.getGradebooks().subscribe(
            (gradebooks: Gradebook[]) => {
                console.log(gradebooks);
                this.gradebooks = gradebooks;
            }
        );
    }

    onAddGradebook() {
        this._gradebookService.addGradebook(new Gradebook(this.addGradebookForm.value.name, [])).subscribe(
            res => console.log(res),
            error => {
                if (error.title.includes("Not authenticated")) {
                    this.router.navigateByUrl('/auth/signin');
                }
            }
        );
        this.addGradebookForm.reset();
    }

    isLoggedIn() {
        return this.authService.isLoggedIn()
    }
}