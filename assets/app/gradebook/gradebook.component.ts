import {Component, DoCheck, OnInit} from '@angular/core';
import {Gradebook} from "./gradebook.model";
import {GradebookService} from "./gradebook.service";
import {ActivatedRoute} from "@angular/router";
import {Category} from "./category/category.model";

@Component({
    selector: 'app-gradebook',
    template: `

        <span *ngIf="gradebook === undefined">loading</span>
        <div class="row" *ngIf="gradebook !== undefined">


            <div *ngIf="errorMessage !== null" class="col-12 alert alert-danger" role="alert">
                {{errorMessage}}
            </div>

            <div class="col-12 col-md-9 order-2 order-md-1">


                <ng-container *ngFor="let category of gradebook.categories">
                    <app-category [category]="category" (change)="submitData()"
                                  (remove)="removeCategory($event); submitData()"></app-category>
                    <br>
                </ng-container>
                <ng-container *ngIf="gradebook.categories.length === 0">
                    <h5>Assignments are placed into categories. Create a category using the form below
                        to start entering your grades.</h5>
                </ng-container>
          

                <hr class="mt-4 mb-4"/>

                <app-gradebook-footer (add)="gradebook.categories.push($event); submitData()">
                </app-gradebook-footer>

            </div>
            <div *ngIf="gradebook !== undefined" class="col-12 col-md-3 order-1 order-md-2">
                <h3 class="block">Grade: {{getGrade()}}</h3>
                <div *ngIf="gradeCalcMessage !== null" class="col-12 alert alert-warning" role="alert">
                    {{gradeCalcMessage}}
                </div>
                <hr class="d-block d-md-none">
            </div>
        </div>
    `,

})
export class GradebookComponent implements OnInit, DoCheck {
    gradebook: Gradebook;

    errorMessage: string = null;
    gradeCalcMessage: string = null;

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

    ngDoCheck() {
        if (this.gradebook) {
            let catWeightTotal = 0;
            this.gradebook.categories.forEach(c => catWeightTotal += c.weight);
            if (catWeightTotal > 1) {
                this.gradeCalcMessage = "Category weights do not add up to 100%. Weights currently add up to "
                    + (catWeightTotal * 100).toFixed(2) + "%.";
            } else {
                this.gradeCalcMessage = null;
            }
        }
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
            return "N/A";
        else if (this.gradebook.grade)
            return (this.gradebook.grade * 100).toFixed(2) + "%";
    }

}
