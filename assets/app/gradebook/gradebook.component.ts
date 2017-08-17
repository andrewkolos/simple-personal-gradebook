import {Component, Input} from '@angular/core';
import {Gradebook} from "./gradebook.model";
import {GradebookService} from "./gradebook.service";

@Component({
    selector: 'app-gradebook',
    template: `
        <div class="col-9">
            <div class="row" *ngFor="let category of gradebook.categories">
                <app-category [category]="category"></app-category>
            </div>
        </div>
    `,
    
})
export class GradebookComponent {

    constructor(private _gradebookService: GradebookService) {
    }

    @Input() gradebook: Gradebook;


}
