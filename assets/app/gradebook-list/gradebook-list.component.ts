import {Component, OnInit} from "@angular/core";
import {Gradebook} from "../gradebook/gradebook.model";
import {GradebookService} from "../gradebook/gradebook.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GRADEBOOK_NAME_PATTERN} from "../general/patterns";

@Component({
    selector: 'app-gradebook-list',
    template: `
        <div class="card-columns">
            <app-gradebook-card class="card" *ngFor="let gradebook of gradebooks" [gradebook]="gradebook"></app-gradebook-card>
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
    `, styleUrls: ['gradebook-list.css']
})
export class GradebookListComponent implements OnInit {
    addGradebookForm: FormGroup;

    gradebooks: Gradebook[];

    constructor(private _gradebookService: GradebookService) {
    }

    ngOnInit() {
        this.addGradebookForm = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.pattern(GRADEBOOK_NAME_PATTERN)])
        });

        this._gradebookService.getGradebooks().subscribe(
            (gradebooks: Gradebook[]) => {
                console.log(gradebooks);
                this.gradebooks = gradebooks;
            }
        );
    }

    onAddGradebook() {
        this._gradebookService.addGradebook(new Gradebook(this.addGradebookForm.value.name, [])).subscribe(res => console.log(res));
        this.addGradebookForm.reset();
    }
}