import {Component, OnInit} from '@angular/core';
import {Gradebook} from "./gradebook.model";
import {GradebookService} from "./gradebook.service";
import {ActivatedRoute} from "@angular/router";
import {Category} from "./category/category.model";

@Component({
    selector: 'app-gradebook',
    template: `
        <div class="col-9">
            <span *ngIf="gradebook === undefined">loading</span>

            <ng-container *ngIf="gradebook !== undefined">
                <ng-container *ngFor="let category of gradebook.categories">
                    <app-category [category]="category" (change)="submitData()"
                                  (remove)="removeCategory($event); submitData()"></app-category>
                    <br>
                </ng-container>
            </ng-container>

            <hr class="mt-2"/>
            
            <app-gradebook-footer (add)="gradebook.categories.push($event); submitData()">
            </app-gradebook-footer>
        </div>
    `,

})
export class GradebookComponent implements OnInit {
    gradebook: Gradebook;

    ngOnInit(): void {
        let id;
        this._route.params.subscribe(params => {
            id = params['id'];
        });

        this._gradebookService.getGradebookById(id)
            .subscribe(
                (gradebook: Gradebook) => {
                    this.gradebook = gradebook;
                }
            );
    }

    constructor(private _gradebookService: GradebookService, private _route: ActivatedRoute) {
    }

    submitData() {
        this._gradebookService.updateGradebook(this.gradebook).subscribe(result => console.log(result));
    }

    removeCategory(category: Category) {
        this.gradebook.categories.splice(this.gradebook.categories.indexOf(category), 1);
    }
}
