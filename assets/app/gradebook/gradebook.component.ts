import {Component, OnInit} from '@angular/core';
import {Gradebook} from "./gradebook.model";
import {GradebookService} from "./gradebook.service";
import {ActivatedRoute} from "@angular/router";
import {Category} from "./category/category.model";

@Component({
    selector: 'app-gradebook',
    template: `
        <div class="row">
            <div *ngIf="errorMessage !== null" class="col-12 alert alert-danger" role="alert">
                {{errorMessage}}
            </div>

            <div class="col-12 col-md-9 order-2 order-md-1">

                <span *ngIf="gradebook === undefined">loading</span>

                <ng-container *ngIf="gradebook !== undefined">
                    <ng-container *ngFor="let category of gradebook.categories">
                        <app-category [category]="category" (change)="submitData()"
                                      (remove)="removeCategory($event); submitData()"></app-category>
                        <br>
                    </ng-container>
                    <ng-container *ngIf="gradebook.categories.length === 0">
                        <h5>Assignments are placed into categories. Create a category using the form below
                            to start entering your grades.</h5>
                    </ng-container>
                </ng-container>

                <hr class="mt-4 mb-4"/>

                <app-gradebook-footer (add)="gradebook.categories.push($event); submitData()">
                </app-gradebook-footer>

            </div>
            <div *ngIf="gradebook !== undefined" class="col-12 col-md-3 order-1 order-md-2">
                <h3 class="block">Grade: {{getGrade()}}</h3>
                <hr class="d-block d-md-none">
            </div>
        </div>
    `,

})
export class GradebookComponent implements OnInit {
    gradebook: Gradebook;

    errorMessage: string = null;

    ngOnInit(): void {
        let id;
        this._route.params.subscribe(params => {
            id = params['id'];

            this._gradebookService.getGradebookById(id)
                .subscribe(
                    (gradebook: Gradebook) => {
                        this.gradebook = gradebook;
                    },
                    error => {
                        console.log(error);
                    }
                );
        });
    }

    constructor(private _gradebookService: GradebookService, private _route: ActivatedRoute) {
    }

    submitData() {
        this._gradebookService.updateGradebook(this.gradebook).subscribe(
            result => {
                console.log(result)
                this.errorMessage = null;
            },
            error => {
                this.errorMessage = "The gradebook could not be saved at this time. Please try refreshing the page."
                console.log(error);
            });
    }


    removeCategory(category: Category) {
        this.gradebook.categories.splice(this.gradebook.categories.indexOf(category), 1);
    }

    getGrade(): string {
        if (isNaN(this.gradebook.grade))
            return "N/A"
        else
            return (this.gradebook.grade * 100).toFixed(2) + "%";
    }
}
