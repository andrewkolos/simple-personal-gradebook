import {Component, Input} from '@angular/core';
import {Gradebook} from "./gradebook.model";
import {GradebookService} from "./gradebook.service";

@Component({
    selector: 'app-gradebook',
    template: `
        <div class="col-9">
            <app-category class="row" *ngFor="let category of gradebook.categories"
                          [category]="category"></app-category>
        </div>
    `,

})
export class GradebookComponent {

    constructor(private _gradebookService: GradebookService) {
    }

    @Input() gradebook: Gradebook = this._gradebookService.getGradebooks()[0];

}
