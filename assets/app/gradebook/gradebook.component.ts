import {Component, Input, OnInit} from '@angular/core';
import {Gradebook} from "./gradebook.model";
import {GradebookService} from "./gradebook.service";

@Component({
    selector: 'app-gradebook',
    template: `
        <div class="col-9" *ngFor="let category of gradebook.categories">
            <app-category [category]="category"></app-category>
            <br>
        </div>
    `,

})
export class GradebookComponent implements OnInit {
    @Input() gradebook: Gradebook;

    ngOnInit(): void {
        this._gradebookService.getGradebooks()
            .subscribe(
                (gradebooks: Gradebook[]) => {
                    this.gradebook = gradebooks[0];
                }
            );
    }

    constructor(private _gradebookService: GradebookService) {
    }





}
